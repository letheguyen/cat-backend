const mongoose = require('mongoose')

const product = new mongoose.Schema({
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
        detailSizeType: {
          type: [
            {
              sizeAndType: String,
              quantity: Number,
              price: Number,
            },
          ],
        },
      },
    ],
    required: true,
  },
})

const Product = mongoose.model('product', product)

module.exports = Product
