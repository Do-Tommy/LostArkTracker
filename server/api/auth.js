import { Router } from 'express';
import passport from 'passport';  
import '../strategies/local-strategy.js';
import { userSchema, validate } from './schemas/index.js';
import { User } from '../mongoose/schemas/user.js';
import bcrypt from 'bcrypt';

//FIX: Strong dependency on bcrypt/salt
const SALT_ROUNDS = 10;
const router = Router();

router.post('/register', validate(userSchema), async (req, res, next) => {
  const { body } = req;
  const newUser = new User({
    username: body.username,
    password: await bcrypt.hash(body.password, SALT_ROUNDS)
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post('/authenticate', passport.authenticate('local'), (req, res) => {
  res.send({message: "Succesfully Authenticated"})
});

router.post('/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
  });
  res.sendStatus(200);
});

export default router;