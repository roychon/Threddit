const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/threads');

const PORT = process.env.PORT || '3000';
const MONGODB_URL = process.env.MONGODB_URL;

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(cookieParser());
//

app.use('/threads', /* insert the authenticateToken middleware */ threadRouter);
app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);

// START SERVER
app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log(`Server connected on port ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
