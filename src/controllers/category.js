const Categorys = require('../models/categorys')

const { handleDeleteFile } = require('../utils')
const { ERROR_CODE } = require('../constants')

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

module.exports = {
  createCategory,
}
