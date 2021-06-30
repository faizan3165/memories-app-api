import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {} from 'dotenv/config'

// import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();

// dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// var whitelist = ['http://localhost:5000', 'https://memories-react-prject.herokuapp.com/posts']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
	res.send('Welcome to Memories API');
});

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.LOCAL_DB, {
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
