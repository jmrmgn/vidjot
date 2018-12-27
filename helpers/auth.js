module.exports = {
   ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
         return next();
      }
      req.flash('error_msg', 'Not authorized');
      res.redirect('/login');
   },
   canLogin: (req, res, next) => {
      if (!req.isAuthenticated()) {
         return next();
      }
      res.redirect('/ideas');
   }
};