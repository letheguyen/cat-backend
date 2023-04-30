const uploadFile = async (req, res) => {
  try {
    const urlImages = process.env.PUBLIC_URL + req?.file?.filename
    if (urlImages) {
      return res.status(200).json(urlImages)
    }
    return res.status(400).json({ message: 'Upload failure' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  uploadFile,
}
