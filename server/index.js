import express from 'express';
import morgan from 'morgan';
import apiRouter from './api/index.js';
import session from 'express-session'
import dotenv from 'dotenv';
import passport from 'passport';
import './strategies/local-strategy.js';
dotenv.config();

const { 
  PORT = 8080,
  SESSION_SECRET = 'placeholder secret'
} = process.env;

const app = express();

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

app.post('/authenticate', passport.authenticate('local'), (req, res) => {
  res.send({message: "Succesfully Authenticated"})
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Now listening on PORT: ${PORT}`);
})