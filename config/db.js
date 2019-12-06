const mongoose = require('mongoose');
const keys = require('./keys')
const db = keys.mongoURI

const connectDB = async()=>{
  try {
      await mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
  console.log('Data Base Connected')
  } catch (error) {
    console.log('Data Base Not Connected')
    process.exit(1)
  }

}

module.exports = connectDB