const mongoose = require('mongoose')
const { DEFAULT_ROLE } = require('../constants')

const users = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, require: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  provinces: { type: String, required: false },
  districts: { type: String, required: false },
  wards: { type: String, required: false },
  addressDetail: { type: String },
  role: { type: String, required: true, default: DEFAULT_ROLE },
  avatar: { type: String, required: false },
  background: { type: String, required: false },
})

const Users = mongoose.model('users', users)

module.exports = Users
