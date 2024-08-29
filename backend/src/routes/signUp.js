const { Router } = require('express');
const signUpRouter = Router();
const UserController = require('../controllers/userController.js');

signUpRouter.post('/', UserController.createUser);

module.exports = signUpRouter;
