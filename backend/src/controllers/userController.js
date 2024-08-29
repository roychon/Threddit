const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user_db = await User.create({ username, password });

    // Create jwt token for the user
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    res.json({ accessToken: accessToken });
  } catch {
    res.status(500).send('A user with that username already exists');
  }
};

// authenticate token middle
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
}

module.exports = { createUser, authenticateToken };
