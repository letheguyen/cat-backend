const mongoose = require('mongoose')
const { STATUS_CATEGORY } = require('../constants')

const categorys = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  avatar: { type: String, required: true },
  background: { type: String, required: true },
  attribute: { type: Array, required: false },
  productsCount: { type: Number, required: true, default: 0 },
  status: { type: Number, required: true, default: STATUS_CATEGORY.start },
})

const Categorys = mongoose.model('categorys', categorys)

module.exports = Categorys
