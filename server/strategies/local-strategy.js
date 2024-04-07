import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUserByID, getUserByUsername } from '../db/users.js';
import { User } from '../mongoose/schemas/user.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      console.log("hello", user);
      if (!user) throw new Error('User not found');
      if (user.password !== password) throw new Error("Bad Credentials");
      if (user.password !== password) {
        throw new Error('Incorrect Credentials');
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);