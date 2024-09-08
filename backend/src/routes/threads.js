const { Router } = require('express');
const threadRouter = Router();
const ThreadController = require('../controllers/threadController');
const Thread = require('../model/Threads');
const Post = require('../model/Post');
const User = require('../model/User');

// TODO: move this to ThreadController and also look at other files where you can move to controller
threadRouter.post('/', ThreadController.createThread);

threadRouter.post('/join', ThreadController.joinThread);

threadRouter.post('/leave', ThreadController.leaveThread);

threadRouter.get('/membership', ThreadController.checkMembership);

threadRouter.get('/name/:threadID', ThreadController.getThreadName);

// get posts related to threadID
threadRouter.get('/posts/:threadID', ThreadController.getThreadPosts);

threadRouter.post('/search-bar', ThreadController.searchKeyword);

module.exports = threadRouter;
