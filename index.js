const express = require('express')
const app = express();
require('dotenv').config()
const router = require('./routes/route')
const {connect} = require('./config/database')

app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT,() => {
  console.log('Server started on PORT : '+PORT)
  connect();
})

app.use('/api/v1',router)

app.get('/',(req,res) => {
  res.json({message:'Server started'})
})