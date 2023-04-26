const mongoose = require('mongoose')

const users = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String },
  role: { type: String, required: true },
  avatar: { type: String, required: false },
  background: { type: String, required: false },
})

const Users = mongoose.model('users', users)

module.exports = Users
