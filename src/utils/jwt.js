const jwt = require('jsonwebtoken')

const handleCreateToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY)
}

const verifyToken = (req, role, originToken) => {
  let token = originToken
    ? originToken
    : req?.headers?.authorization?.replace('Bearer ', '')
  if (!token) return null
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return null
    if (role) {
      return decoded.role === role
    }
    return decoded
  })
}

module.exports = {
  handleCreateToken,
  verifyToken,
}
