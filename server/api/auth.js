import { Router, response } from 'express';
import passport from 'passport';  
import '../strategies/local-strategy.js';
import { userSchema, validate } from './schemas/index.js';
import { User } from '../mongoose/schemas/user.js';

const router = Router();

router.post('/', validate(userSchema), async (req, res, next) => {
  const { body } = req;
  const newUser = new User(body);
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