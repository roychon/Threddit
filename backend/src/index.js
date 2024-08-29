const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const signUpRouter = require('./routes/signUp');

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
//

app.use('/sign-up', signUpRouter);

// START SERVER
app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log(`Server connected on port ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
