const bcrypt = require('bcryptjs');

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

   const userInput = {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2
   };
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
         res.render('users/register', userInput);
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