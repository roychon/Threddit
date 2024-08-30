const { Router } = require('express');
const threadRouter = Router();
const ThreadController = require('../controllers/threadController');

threadRouter.post('/', ThreadController.searchKeyword);

module.exports = threadRouter;
