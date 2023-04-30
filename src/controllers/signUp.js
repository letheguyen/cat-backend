const Users = require('../models/users')
const { handleDeleteFile } = require('../utils')
const { ERROR_CODE } = require('../constants')

const signUp = async (req, res) => {
  try {
    const dataBoy = req.body

    const user = await Users.findOne({
      phone: dataBoy?.phone,
    })

    if (user) {
      if (dataBoy.background) handleDeleteFile(dataBoy.background)
      if (dataBoy.avatar) handleDeleteFile(dataBoy.avatar)
      return res.status(400).json(ERROR_CODE.ACCOUNT_EXISTS)
    }
    await Users.create(dataBoy)
    return res.status(200).json(ERROR_CODE.CREATE_SUCCESS)
  } catch (err) {
    return res
      .status(500)
      .json({
        message: err?.message,
        errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
      })
  }
}

module.exports = {
  signUp,
}
