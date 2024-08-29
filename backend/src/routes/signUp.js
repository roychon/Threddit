const { Router } = require('express');
const signUpRouter = Router();
const User = require('../model/User');

signUpRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send('Sent');
  } catch {
    res.status(500).send('A user with that username already exists');
  }
});

module.exports = signUpRouter;
