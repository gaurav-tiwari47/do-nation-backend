const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  otp:{
    type:Number,
  },
  ngoName:[{
    type:mongoose.Types.ObjectId,
    ref:'ngos'
  }],
  donations:[{
    type:mongoose.Types.ObjectId,
    ref:'donations',
  }],
  
},{timestamps:true})

module.exports = mongoose.model('Client',clientSchema);
