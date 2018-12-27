const Idea = require('../models/Idea');

exports.getIdeas = async (req, res) => {
   try {
      const ideas = await Idea.find({ user: req.user.id }).sort({ date: 'desc' });
      res.render('ideas/index', {
         ideas: ideas
      });
   }
   catch (error) {
      console.log(error);
   }
};

exports.getAddIdea = (req, res) => {
   res.render('ideas/add');
};

exports.getEditIdea = async (req, res) => {
   const ideaId = req.params.id;
   try {
      const idea = await Idea.findOne({
         _id: ideaId
      });

      if (idea.user != req.user.id) {
         req.flash('error_msg', 'Not authorized');
         res.redirect('/ideas');
      }
      else {
         res.render('ideas/edit', {
            idea: idea
         });
      }
   }
   catch (error) {
      res.redirect('/ideas');
   }
};

exports.postAddIdea = async (req, res) => {
   let errors = [];

   if (!req.body.title) {
      errors.push({text: 'Please add a title'});
   }

   if (!req.body.details) {
      errors.push({text: 'Please add a details'});
   }

   if (errors.length > 0) {
      res.render('ideas/add', {
         errors: errors,
         title: req.body.title,
         details: req.body.details
      });
   }
   else {
      try {
         const newIdea = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
         };

         await new Idea(newIdea).save();
         req.flash('success_msg', `${req.body.title} added.`);
         res.redirect('/ideas');
      }
      catch (error) {
         console.log(error);
      }
   }
};

exports.putEditIdea = async (req, res) => {
   const ideaId = req.params.id;
   const title = req.body.title;
   const details = req.body.details;
   
   let errors = [];

   if (!title) {
      errors.push({text: 'Please add a title'});
   }

   if (!details) {
      errors.push({text: 'Please add a details'});
   }

   if (errors.length > 0) {
      res.render('ideas/edit/' + ideaId, {
         errors: errors,
         title: req.body.title,
         details: req.body.details
      });
   }
   else {
      try {
         const idea = await Idea.findOne({ _id: ideaId });
         idea.title = title;
         idea.details = details;
         await idea.save();
         req.flash('success_msg', 'Video idea updated');
         res.redirect('/ideas');
      }
      catch(error) {
         console.log(error);
      }
   }
};

exports.deleteIdea = async (req, res) => {
   const ideaId = req.params.id;

   try {
      await Idea.findOneAndDelete(ideaId);
      req.flash('success_msg', 'Videa Idea removed.');
      res.redirect('/ideas');
   }
   catch (error) {
      console.log(error);
   }
};