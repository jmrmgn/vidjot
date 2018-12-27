exports.getIndex = (req, res) => {
   const title = 'Welcome';
   res.render('index', {
      title: title
   });
};

exports.getAbout = (req, res) => {
   res.render('about');
};