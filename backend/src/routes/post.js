const { Router } = require('express');
const { authenticateToken } = require('../controllers/userController');
const postRouter = Router();
const Post = require('../model/Post');
const User = require('../model/User');
const PostController = require('../controllers/postController');

postRouter.post('/', authenticateToken, PostController.createPost);

postRouter.get('/', PostController.getPosts);

// Get posts related to the keyword
postRouter.post('/keyword', PostController.getKeywordPosts);

module.exports = postRouter;
