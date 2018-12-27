const express = require('express');
const exphbs = require('express-handlebars');
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

// Add idea route
app.get('/ideas/add', (req, res) => {
   res.render('ideas/add');
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

const port = 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});