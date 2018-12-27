const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = (passport) => {
   passport.use(new LocalStrategy({
      usernameField: 'email'
   },
   async (email, password, done) => {
      const user = await User.findOne({ email: email });

      // Match user
      if (!user) {
         done(null, false, {message: 'No user found'});
      }

      // Match password
      const doMatch = await bcrypt.compare(password, user.password);
      if (doMatch) {
         done(null, user);
      }
      else {
         done(null, false, {message: 'Password incorrect'});
      }
   }));

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
         done(err, user);
      });
   });
}