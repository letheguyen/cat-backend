const { URL_PUBLIC, URL_USER, URL_ADMIN } = require('../constants')

const checkAuthorization = (req, res, next) => {
  console.log('Check auth',)
  next()
}

module.exports = checkAuthorization
