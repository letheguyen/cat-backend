const Products = require('../models/products')
const Categorys = require('../models/categorys')

const { handleDeleteFile } = require('../utils')
const { ERROR_CODE } = require('../constants')

const createProduct = async (req, res) => {
  try {
    const dataBody = req.body
    const dataProduct = await Products.create(dataBody)

    if (!dataProduct) {
      dataBody?.images?.map((image) => {
        if (image?.image) {
          handleDeleteFile(image.image)
        }
      })
      return res.status(400).json(ERROR_CODE.ACTION_FAILURE)
    }

    await Categorys.findByIdAndUpdate(
      dataBody.category,
      { $inc: { productsCount: 1 }},
      { new: true }
    )

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
    const lengthCategory = await Products.find({}, { title: true })

    if (page && limit) {
      product = await Products.find(
        {},
        {
          __v: false,
        }
      )
        .skip((Number(page) - 1) * Number(limit))
        .limit(limit)
    } else {
      product = await Products.find()
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
  getProducts
}
