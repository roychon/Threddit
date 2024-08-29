const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    const { username } = req.body;
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ username, password: hasedPassword });

    // Create jwt token for the user
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    return res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ message: 'Created user successfully' });
  } catch {
    res.status(500).send('A user with that username already exists');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username: username });
  if (!user) return res.status(404).send('User not found in database');
  try {
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      // We send a jwt token with cookie like above
      const accessToken = jwt.sign(
        // NOTE: if we sign using 'user' from database, error will occur since this is not a plain object, as it has custom methods
        { username: user[0].username },
        process.env.ACCESS_TOKEN
      );
      console.log(match);
      return res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .json({ message: 'Logged in successfully' });
      return res.json({ key: 'hi' });
    } else {
      console.log('test3');
    }
  } catch {
    res.sendStatus(401);
  }
};

module.exports = { createUser, loginUser, authenticateToken };
