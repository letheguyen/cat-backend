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
app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(checkAuthorization)
app.use(router)

connectDb()

// Chat
const http = require('http')
const server = http.createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: [process.env.URL_FRONT_END],
  }
});

io.on('connection', (socket) => {
  socket.on('CHAT', (message) => {
    console.log('Received message:', message)
    io.emit('CHAT', message)
  })
})


server.listen(process.env.PORT, () =>
  console.log('On port http://localhost:' + process.env.PORT)
)
