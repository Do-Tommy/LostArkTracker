import express from 'express';
import morgan from 'morgan';
import session from 'express-session'
import dotenv from 'dotenv';
import passport from 'passport';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRouter from './api/index.js';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
  saveUninitialized: false, //when true: unmodified cookies are not saved in the store
  resave: false, //when true if there are no changes to cookie, it does not refresh the timer
  cookie: {
    maxAge: 60000 * 60 * 24 // 60 seconds * 60 mins * 24 hours
  },
  store: MongoStore.create({ client: mongoose.connection.getClient() })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "..", "client", "dist")))

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Now listening on PORT: ${PORT}`);
})