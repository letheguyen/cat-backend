const mongoose = require('mongoose')

const categorys = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  avatar: { type: String, required: true },
  background: { type: String, required: true },
  attribute: { type: Array, required: false },
})

const Categorys = mongoose.model('categorys', categorys)

module.exports = Categorys
