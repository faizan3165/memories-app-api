import express from 'express';
import cors from 'cors';

import { getPosts, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

var whitelist = [
	'http://localhost:5000',
	'https://serene-river-10220.herokuapp.com/posts'
];

var corsOptionsDelegate = function(req, callback){
	var corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

router.get('/', cors(corsOptionsDelegate), getPosts);

router.post('/', createPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

router.patch('/:id/likePost', likePost);
export default router;
