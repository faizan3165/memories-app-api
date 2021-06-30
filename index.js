import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

// import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();

// dotenv.config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.options('*', cors());

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

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
