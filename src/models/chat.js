const mongoose = require('mongoose')

const chat = new mongoose.Schema({
  idRoom: { type: String, required: true },
  idUserCreate: { type: String, required: true },
  idSend: { type: String, required: true },
  content: { type: String, required: true },
})

const Chat = mongoose.model('chat', chat)

module.exports = Chat
