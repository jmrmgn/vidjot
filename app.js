const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverdrive = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const mainRoutes = require('./routes/main');
const ideaRoutes = require('./routes/ideas');
const userRoutes = require('./routes/users');

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Connect to mongoose
mongoose.connect(db.MONGO_URI, {
   useNewUrlParser: true
})
.then(() => {
   console.log('MongoDB Connected');
})
.catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body pareser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder implementation
app.use(express.static(path.join(__dirname, 'public')));

// Method overrid middleware
app.use(methodOverdrive('_method'));

// Express Session middleware
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Global variables
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
});

// Use routes
app.use(mainRoutes);
app.use('/ideas', ideaRoutes);
app.use(userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});