const { Router } = require('express');
const signOutRouter = Router();
const UserController = require('../controllers/userController.js');

signOutRouter.post('/', UserController.signOutUser);

module.exports = signOutRouter;
