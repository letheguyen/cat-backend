const http = require('http')
const Chat = require('../models/chat')

const { CHAT } = require('../constants')
const { saveChat } = require('../controllers')
const { verifyToken } = require('../utils')

const realTimeApp = (app) => {
  const server = http.createServer(app)

  // const
  let dataMessage = []
  let timmerId = null
  let dataLogin = {}
  let users = []

  // Socket
  const io = require('socket.io')(server, {
    cors: {
      origin: [process.env.URL_FRONT_END],
    },
  })

  // handle save message
  const handleSaveMessage = async () => {
    if (dataMessage.length === 0) return
    const res = await saveChat(dataMessage)
    if (res) dataMessage = []
  }

  // Get rooms
  const getDataRoom = async (dataChat) => {
    const isCreate = await Chat.findOne({ idRoom: dataChat.idRoom })
    if (isCreate && dataLogin[dataChat.from]) {
      const newChat = { ...dataChat, created: Date.now() }
      dataMessage.push(newChat)

      if (timmerId) clearTimeout(timmerId)
      io.emit(dataChat.idRoom, newChat)

      timmerId = setTimeout(() => {
        handleSaveMessage()
      }, CHAT.timeSaveMessage)
    }
  }

  // Event Io
  io.on('connection', (socket) => {
    socket.on('CHAT', (message) => {
      getDataRoom(message)
    })

    socket.on('LOGIN', (token) => {
      dataAccount = verifyToken(undefined, undefined, token)
      if (!dataAccount._id) return
      dataLogin = { ...dataLogin, [dataAccount._id]: true }

      if (users.includes(dataAccount._id)) {
        io.emit('ACCOUNT_ONLINE', users)
      } else {
        users.push(dataAccount._id)
        io.emit('ACCOUNT_ONLINE', users)
      }
    })
  })

  return server
}

module.exports = {
  realTimeApp,
}
