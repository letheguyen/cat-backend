const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')

const router = require('./router')
const { connectDb } = require('./config')
const { realTimeApp } = require('./realTime')
const checkAuthorization = require('./authentication')

dotenv.config()
const app = express()

app.use(cors())
app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(checkAuthorization)
app.use(router)

connectDb()

const server = realTimeApp(app)

server.listen(process.env.PORT, () =>
  console.log('On port http://localhost:' + process.env.PORT)
)
