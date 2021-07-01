// const cors = require('cors')({ origin: '*' });
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

// import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();

// dotenv.config();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors());

const allowList = [
	'http://localhost:3000',
	'http://localhost:5000/posts'
];

const corsOptionsDelegate = (req, callback) => {
	let corsOptions;

	let isDomainAllowed = allowList.indexOf(req.header('Origin')) !== -1;
	// let isExtensionAllowed = req.path.endsWith('.jpg');

	if (isDomainAllowed) {
		// Enable CORS for this request
		corsOptions = { origin: true };
	} else {
		// Disable CORS for this request
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
	res.send('Welcome to Memories API');
});

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
	})
	.catch((error) => {
		console.error(error.message);
	});

mongoose.set('useFindAndModify', false);
