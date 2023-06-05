const ShopInformation = require('../models/shopInformation')
const Users = require('../models/users')

const { ERROR_CODE, ADMIN_ROLE } = require('../constants')
const { handleDeleteFile } = require('../utils')

const updateShopInformation = async (req, res) => {
  try {
    const dataBoy = req.body
    const oldInformation = await ShopInformation.find({})

    if (oldInformation.length === 0) {
      await ShopInformation.create(dataBoy)
      return res.status(200).json(ERROR_CODE.CREATE_SUCCESS)
    }

    const update = await ShopInformation.updateOne({}, dataBoy)

    if (update?.acknowledged && oldInformation?.[0]?.avatar) {
      handleDeleteFile(oldInformation?.[0]?.avatar)
      return res.status(200).json(ERROR_CODE.CREATE_SUCCESS)
    }

    return res.status(400).json(ERROR_CODE.ACTION_FAILURE)
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

const getShopInformation = async (req, res) => {
  try {
    const admin = await Users.findOne({ role: ADMIN_ROLE })
    const dataInformation = await ShopInformation.find(
      {},
      { __v: false }
    )
    dataInformation[0]._id = admin._id
    return res.status(200).json(dataInformation)
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

module.exports = {
  updateShopInformation,
  getShopInformation,
}
