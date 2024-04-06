import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUserByID, getUserByUsername } from '../db/users.js';

passport.serializeUser((user, done) => {
  console.log('seriabliczer');
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserialbice');
  console.log(id);
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
    console.log(username);
    console.log(password);
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