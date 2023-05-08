const handleCheckUrlRequest = (req) => {
  if (!req?.headers?.origin) return null
  if (req.headers.origin === process.env.URL_FRONT_END) return true
}

module.exports = {
  handleCheckUrlRequest,
}
