const { URL_ADMIN, ADMIN_ROLE, URL_USER } = require('../constants')
const { convertObjectToArray, verifyToken } = require('../utils')

const checkAuthorization = (req, res, next) => {
  const urlReq = req.url
  const data = verifyToken(req)
  const urlsAdmin = convertObjectToArray(URL_ADMIN)
  const urlsUsers = convertObjectToArray(URL_USER)

  if (data) {
    if (urlsAdmin.includes(urlReq) && data.role !== ADMIN_ROLE) {
      return res.status(403).json({
        message: 'Not have access',
      })
    }
  }

  if (urlsUsers.includes(urlReq) && !data) {
    return res.status(403).json({
      message: 'Not have access',
    })
  }

  next()
}

module.exports = checkAuthorization
