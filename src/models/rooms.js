const mongoose = require('mongoose')

const rooms = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  seller: { type: String, required: true },
  roomImage: { type: String, required: true },
  timeSend: { type: String, required: true, default: Date.now()},
})

const Rooms = mongoose.model('rooms', rooms)

module.exports = Rooms
