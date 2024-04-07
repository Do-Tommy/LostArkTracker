import express from 'express';
import morgan from 'morgan';
import apiRouter from './api/index.js';
import session from 'express-session'
import dotenv from 'dotenv';
import passport from 'passport';
import mongoose from 'mongoose';
dotenv.config();

const { 
  PORT = 8080,
  SESSION_SECRET = 'placeholder secret'
} = process.env;

const app = express();

mongoose.connect('mongodb://localhost/lost_ark_tracker')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));

app.use(morgan('dev'));
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60 * 24 // 60 seconds * 60 mins * 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Now listening on PORT: ${PORT}`);
})