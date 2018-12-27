const express = require('express');
const exphbs = require('express-handlebars');
const methodOverdrive = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
   useNewUrlParser: true
})
.then(() => {
   console.log('MongoDB Connected');
})
.catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body pareser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method overrid middleware
app.use(methodOverdrive('_method'));

/* ROUTES */

// Index route
app.get('/', (req, res) => {
   const title = 'Welcome';
   res.render('index', {
      title: title
   });
});

// About route
app.get('/about', (req, res) => {
   res.render('about');
});

// Idea index page
app.get('/ideas', async (req, res) => {
   try {
      const ideas = await Idea.find().sort({ date: 'desc' });
      res.render('ideas/index', {
         ideas: ideas
      });
   }
   catch (error) {
      console.log(error);
   }
});

// Idea add route
app.get('/ideas/add', (req, res) => {
   res.render('ideas/add');
});

// Idea edit route
app.get('/ideas/edit/:id', async (req, res) => {
   const ideaId = req.params.id;
   try {
      const idea = await Idea.findOne({
         _id: ideaId
      });

      res.render('ideas/edit', {
         idea: idea
      });
   }
   catch (error) {
      res.redirect('/ideas');
   }
});

// Add idea POST route
app.post('/ideas', async (req, res) => {
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
            details: req.body.details
         };

         await new Idea(newIdea).save();
         res.redirect('/ideas');
      }
      catch (error) {
         console.log(err);
      }
   }
});

// Edit idea PUT route
app.put('/ideas/:id', async (req, res) => {
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
         res.redirect('/ideas');
      }
      catch(error) {
         console.log(error);
      }
   }

});

const port = 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});