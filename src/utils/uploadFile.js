const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { verifyToken } = require('./jwt')
const { ADMIN_ROLE } = require('../constants')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isAccess = verifyToken(req, ADMIN_ROLE)
    if (isAccess) {
      cb(null, process.env.FOLDER_PUBLIC)
    } else {
      return cb('Not have access', false)
    }
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

const checkTypeFile = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Unsupported file format'
    return cb(new Error('Unsupported file format'), false)
  }
  cb(null, true)
}

const uploadSingle = multer({
  storage,
  fileFilter: checkTypeFile,
}).single('file')

const handleDeleteFile = (fileName) => {
  const arrayImage = fileName.split('/')
  fs.rmSync(process.env.FOLDER_PUBLIC + arrayImage[arrayImage.length - 1])
}

module.exports = {
  uploadSingle,
  handleDeleteFile,
}
