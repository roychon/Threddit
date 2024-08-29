const User = require('../model/User');
const jwt = require('jsonwebtoken');

// authenticate token middleware (move this to index.js later for ease of use)
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  if (token === null) return res.sendStatus(401);
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.userName = data.name;
    return next();
  } catch {
    return res.status(403);
  }
}

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password });

    // Create jwt token for the user
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    return res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ message: 'Logged in successfully' });
  } catch {
    res.status(500).send('A user with that username already exists');
  }
};

module.exports = { createUser, authenticateToken };
