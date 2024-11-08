const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  client:{
    type:mongoose.Types.ObjectId,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images:{
    type:String,
  },
  donations: [{
    type: mongoose.Types.ObjectId,
    ref: 'Donation', 
  }],
  ngoStatus: {
    type: String,
    enum: ['verified', 'unverified', 'pending'],  
    default: 'unverified',
  },
});

module.exports = mongoose.model('Ngo', ngoSchema);
