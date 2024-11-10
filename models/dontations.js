const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  ngo:{
    type:mongoose.Types.ObjectId,
    ref:'ngos',
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:'user',
  },
  amount:{
    type:String,
    required:true
  },
  transactionId:{
    type:String,
    unique:true,
    required:true,
  },
  donationType:{
    type:String,
    enum:['quick-donation','subscription-donation'],
    required:true
  }
},{timestamps:true})

module.exports = mongoose.model('Donations',donationSchema);