const multer = require('multer')
const { storage, checkTypeFile } = require('../utils')

const uploadFile = async (req, res) => {
  try {
    const upload = multer({
      storage,
      fileFilter: checkTypeFile,
    }).fields([{ name: 'file', maxCount: 12 }])

    upload(req, res, async (err) => {
      if (err) res.status(400).json({ message: 'Upload failure' })

      const dataImages = req?.files?.file.map(
        (file) => process.env.PUBLIC_URL + file?.filename
      )
      
      return res.status(200).json(dataImages)
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = uploadFile
