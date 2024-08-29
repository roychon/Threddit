const { Router } = require('express');
const loginRouter = Router();
const UserController = require('../controllers/userController');

loginRouter.post('/', UserController.loginUser);

module.exports = loginRouter;
