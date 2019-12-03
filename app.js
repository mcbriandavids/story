const express = require('express')
const connectDB = require('./config/db')
const passport = require('passport')
const app = express()

// Passport Middleware

// require('./config/passport')(passport)

connectDB()
app.get('/',(req, res)=>{
  res.send('Story Books...')
})

// All Routes
require('./config/passport')(passport)
app.use('/auth', require('./routes/api/auth'))


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`)
})