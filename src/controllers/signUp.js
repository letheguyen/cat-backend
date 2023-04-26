const multer = require('multer')

const { storage, checkTypeFile } = require('../utils')
const Users = require('../models/users')

const signUp = async (req, res) => {
  try {
    const upload = multer({
      storage,
      fileFilter: checkTypeFile,
    }).fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ])

    upload(req, res, async (err) => {
      console.log(err)
    })

    return res.status(400).json({ message: 'Account already exists' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  signUp,
}
