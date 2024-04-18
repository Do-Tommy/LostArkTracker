import { Router } from 'express';
import passport from 'passport';  
import '../strategies/local-strategy.js';
import { userSchema, validate } from '../schemas/index.js';
import { register } from '../handlers/auth.js';

//FIX: Strong dependency on bcrypt/salt
const router = Router();

router.post('/register', validate(userSchema), register);

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