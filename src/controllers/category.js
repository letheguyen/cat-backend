const Categorys = require('../models/categorys')

const { handleDeleteFile } = require('../utils')
const { ERROR_CODE, DEFAULT_LIMIT, DEFAULT_PAGE_SIZE } = require('../constants')

const createCategory = async (req, res) => {
  try {
    const dataBoy = req.body
    const categoryOld = await Categorys.findOne({
      title: dataBoy?.title,
    })

    if (categoryOld) {
      if (dataBoy.background) handleDeleteFile(dataBoy.background)
      if (dataBoy.avatar) handleDeleteFile(dataBoy.avatar)
      return res.status(400).json(ERROR_CODE.EXISTS)
    }

    await Categorys.create(dataBoy)
    return res.status(200).json(ERROR_CODE.CREATE_SUCCESS)
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

const getCategorys = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE_SIZE, limit = DEFAULT_LIMIT } = req.query

    const lengthCategory = await Categorys.find({}, { title: true })
    const categorys = await Categorys.find(
      {},
      {
        __v: false,
      }
    )
      .skip((Number(page) - 1) * Number(limit))
      .limit(limit)

    return res.status(200).json({
      data: categorys,
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

const deleteCategory = async (req, res) => {
  try {
    const dataDelete = await Categorys.findByIdAndDelete(req.params.id)

    if (dataDelete) {
      if (dataDelete.background) handleDeleteFile(dataDelete.background)
      if (dataDelete.avatar) handleDeleteFile(dataDelete.avatar)
    }

    return res.status(200).json(ERROR_CODE.CREATE_SUCCESS)
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

module.exports = {
  createCategory,
  getCategorys,
  deleteCategory,
}
