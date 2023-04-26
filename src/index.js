const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')

const router = require('./router')
const { connectDb } = require('./config')

const checkAuthorization = require('./authentication')

dotenv.config()
const app = express()

app.use(cors())
app.use(checkAuthorization)
app.use(express.static('./public'))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb' }, { extended: true }))

app.use(router)

connectDb()

app.listen(process.env.PORT, () =>
  console.log('On port http://localhost:' + process.env.PORT)
)
