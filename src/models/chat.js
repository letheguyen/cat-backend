const mongoose = require('mongoose')

const chat = new mongoose.Schema(
  {
    idRoom: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    idUserCreate: { type: String, required: true },
    created: { type: Number, required: true },
  }
)

const Chat = mongoose.model('chat', chat)

module.exports = Chat
