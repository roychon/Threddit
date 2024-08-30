const { Router } = require('express');
const threadRouter = Router();
const ThreadController = require('../controllers/threadController');

homeRouter.post('/', ThreadController.searchKeyword);

module.exports = threadRouter;
