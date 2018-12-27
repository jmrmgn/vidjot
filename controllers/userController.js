exports.getLogin = async(req, res) => {
   res.render('users/login');
};

exports.getRegister = async(req, res) => {
   res.render('users/register');
};