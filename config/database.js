const mongoose = require('mongoose')
require('dotenv').config()


exports.connect = async() => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI,{
      dbName:'donations'
    })
    console.log('Database connection established')
  } catch (error) {
    console.log('Error connecting to DB'+error.message)
  }
}