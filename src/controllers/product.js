const Product = require('../models/product')

const { handleDeleteFile } = require('../utils')
const { ERROR_CODE } = require('../constants')

const createProduct = async (req, res) => {
  try {
    const dataBoy = req.body
    const dataProduct = await Product.create(dataBoy)

    if (!dataProduct) {
      dataBoy?.images?.map((image) => {
        if (image?.image) {
          handleDeleteFile(image.image)
        }
      })
      return res.status(400).json(ERROR_CODE.ACTION_FAILURE)
    }

    return res.status(200).json(ERROR_CODE.CREATE_SUCCESS)
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

const getProducts = async (req, res) => {
  try {
    const { page, limit } = req.query
    let product

    const lengthCategory = await Product.find({}, { title: true })

    if (page && limit) {
      product = await Product.find(
        {},
        {
          __v: false,
        }
      )
        .skip((Number(page) - 1) * Number(limit))
        .limit(limit)
    } else {
      product = await Product.find()
    }

    return res.status(200).json({
      data: product,
      pagination: {
        totalPage: lengthCategory.length,
        limit: Number(limit),
        page: Number(page),
      },
    })
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

module.exports = {
  createProduct,
  getProducts,
}
