const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  googleID:{
    type: String,
    // required: true
  },
  firstName:{
    type: String,
    },
  lastName:{
    type: String,
    },
  email:{
    type: String,
    required: true,
    },
  image:{
    type: String,
    
  }
 
})

module.exports = User = mongoose.model('users', UserSchema)