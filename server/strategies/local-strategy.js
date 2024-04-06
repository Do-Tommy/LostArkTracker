import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUserByID, getUserByUsername } from '../db/users.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = getUserByID(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    try {
      const user = getUserByUsername(username);
      if (!user) {
        throw new Error('User was not found');
      }
      if (user.password !== password) {
        throw new Error('Incorrect Credentials');
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);