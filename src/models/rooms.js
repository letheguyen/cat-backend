const mongoose = require('mongoose')

const rooms = new mongoose.Schema({
  idUser: { type: String, required: true },
  roomName: { type: String, required: true },
  avatarUser: { type: String, required: true },
})

const Rooms = mongoose.model('rooms', rooms)

module.exports = Rooms
