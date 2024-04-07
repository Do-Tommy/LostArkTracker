import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../mongoose/schemas/user.js';
import bcrypt from 'bcrypt';

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
      if (!user) throw new Error('User not found');
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw new Error("Bad Credentials");
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);