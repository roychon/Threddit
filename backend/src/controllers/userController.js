const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function to validate the password
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length < minLength ||
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumber ||
    !hasSpecialChar
  ) {
    throw new Error('Password must ');
  }

  return true;
};

// Function to make sure username cannot be blank
const validateUsername = (username) => {
  const minLength = 5;

  if (!username || username.trim().length < minLength) {
    throw new Error(`Username must be at least ${minLength} letters long.`);
  }

  return true;
};

// authenticate token middleware (move this to index.js later for ease of use)
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.sendStatus(401);
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("verified")
    req.username = data.name;
    return next();
  } catch {
    // console.log("error")
    return res.status(403);
  }
}

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    validatePassword(password);
    validateUsername(username);

    const hasedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hasedPassword });

    const user = { name: username, password };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    return res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ message: 'Created user successfully' });
  } catch (error) {
    if (error.message.includes('Password must')) {
      return res
        .status(400)
        .send(
          'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.'
        );
    } else if (error.message.includes('5')) {
      res.status(499).send('Username must be at least 5 letters');
    } else {
      res.status(500).send('A user with that username already exists');
    }
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user)
    return res.status(403).json({
      message:
        "Couldn't find your Threddit account. Enter a new one or create account.",
    });
  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // We send a jwt token with cookie like above
      const accessToken = jwt.sign(
        // NOTE: if we sign using 'user' from database, error will occur since this is not a plain object, as it has custom methods
        { name: user.username },
        process.env.ACCESS_TOKEN
      );
      console.log(match);
      return res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .json({ message: 'Logged in successfully' });
    } else {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error.');
  }
};

const verifyUser = async (req, res) => {
  const { username } = req
  const user = await User.findOne({username})
  if (!user) return res.status(404).send("User not found")
  return res.json({id: user._id, username: user.username})
}

module.exports = { createUser, loginUser, authenticateToken, verifyUser };
