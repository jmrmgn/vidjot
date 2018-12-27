const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

exports.getLogin = async (req, res) => {
   res.render('users/login');
};

exports.getRegister = async (req, res) => {
   res.render('users/register');
};

exports.postRegister = async (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const password2 = req.body.password2;
   let errors = [];

   try {

      const hasEmail = await User.findOne({ email: email });

      if (hasEmail) {
         errors.push({text: 'Email already exist'});
      }
      
      if (password != password2) {
         errors.push({text: 'Password must match!'});
      }

      if (password.length < 4) {
         errors.push({text: 'Password must have 4 minimum characters!'});
      }

      if (errors.length > 0) {
         res.render('users/register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
         });
      }
      else {
         const hashedPw = await bcrypt.hash(password, 12);
         const newUser = new User({
            name: name,
            email: email,
            password: hashedPw,
         });
         newUser.save();
         req.flash('success_msg', 'Successfully registered! You may now login.');
         res.redirect('/login');
      }
   }
   catch (error) {
      console.log(error);
   }
};

exports.postLogin = (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/ideas',
      failureRedirect: '/login',
      failureFlash: true
   })(req, res, next);
};

exports.getLogout = (req, res) => {
   req.logout();
   req.flash('success_msg', 'Goodbye!');
   res.redirect('/login');
};