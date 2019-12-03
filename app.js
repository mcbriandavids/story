const express = require('express')
const connectDB = require('./config/db')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()



connectDB()


app.get('/',(req, res)=>{
  res.send('Story Books...')
})

require('./config/passport')(passport)

app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
  }))

app.use(passport.initialize());
app.use(passport.session());
// Set global Vals
app.use((req, res, next)=>{
  res.locals.User = req.User || null;
  next()
  
})

// All Routes
app.use('/auth', require('./routes/api/auth'))




const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`)
})