const express = require('express')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const path = require('path')


connectDB()

// Handlebars Helper
const {truncate, stripTags, formatDate, select, editIcon} = require('./helpers/hbs');

app.use(methodOverride('_method'))

// Handlebars Middleware
app.engine('handlebars', exphbs({
  helpers:{
  truncate,
    stripTags,
    formatDate, 
    select,
    editIcon
  },
  
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


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

app.use(express.static(path.join(__dirname, 'public')))
// Routes
app.use('/', require('./routes/api/index'))
app.use('/auth', require('./routes/api/auth'))
app.use('/stories', require('./routes/api/stories'))




const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`)
})