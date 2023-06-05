const mongoose = require('mongoose')

const shopInformation = new mongoose.Schema({
  avatar: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  zalo: { type: String, required: true },
  facebook: { type: String, required: true },
  website: { type: String, required: true },
  attribute: { type: Array, required: false },
})

const ShopInformation = mongoose.model('shopInformation', shopInformation)

module.exports = ShopInformation
