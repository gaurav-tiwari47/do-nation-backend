const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
  },
  donations:[{
    type:mongoose.Types.ObjectId,
    ref:"donations",
    default:[]
  }],
  subscriptions:[{
    type:mongoose.Types.ObjectId,
    ref:"subscriptions",
    default:[]
  }]
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)