import bcrypt from 'bcrypt';
import { User } from '../mongoose/schemas/user.js';
const SALT_ROUNDS = 10;

export const register = async (req, res, next) => {
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
}