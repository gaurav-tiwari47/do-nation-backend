const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  otp:{
    type:Number,
  }
},{timestamps:true})

module.exports = mongoose.model('Admin',adminSchema)