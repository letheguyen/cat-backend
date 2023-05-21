const mongoose = require('mongoose')
const { STATUS_CATEGORY } = require('../constants')

const products = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  attribute: {
    type: [
      {
        key: String,
        value: String,
      },
    ],
    required: false,
  },
  images: {
    type: [
      {
        image: String,
        attribute: String,
      },
    ],
    required: true,
  },
  detailSizeType: {
    type: [
      {
        sizeAndType: String,
        quantity: Number,
        price: Number,
      },
    ],
  },
  likes: { type: Number, required: true, default: 0 },
  status: { type: Number, required: true, default: STATUS_CATEGORY.start },
})

const Products = mongoose.model('products', products)

module.exports = Products
