const express = require('express')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()


connectDB()

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

require('./config/passport')(passport)

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


// Routes
app.use('/', require('./routes/api/index'))
app.use('/auth', require('./routes/api/auth'))




const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`)
})