const http = require('http')

const Chat = require('../models/chat')
const Users = require('../models/users')

const { CHAT, ADMIN_ROLE } = require('../constants')
const { saveChat } = require('../controllers')
const { verifyToken } = require('../utils')
const { emit } = require('process')

const realTimeApp = (app) => {
  const server = http.createServer(app)

  // const
  let dataMessage = []
  let timmerId = null
  let users = []
  let isAdmin = false
  let isLogin = false
  let dataAccount = {
    _id: null,
    userName: null,
    email: null,
    role: null,
  }

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

    if (isCreate && dataChat?.from === dataAccount._id) {
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
      isAdmin = verifyToken(undefined, ADMIN_ROLE, token)
      isLogin = dataAccount._id ? true : false

      if (users.includes(dataAccount._id) && isLogin) {
        io.emit('ACCOUNT_ONLINE', users)
      } else {
        users.push(dataAccount._id)
        isLogin && io.emit('ACCOUNT_ONLINE', users)
      }
    })
  })

  return server
}

module.exports = {
  realTimeApp,
}
