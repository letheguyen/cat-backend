const jwt = require('jsonwebtoken')

const handleCreateToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY)
}

const verifyToken = (req, role) => {
  const token = req?.headers?.authorization.replace('Bearer ', '')
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return null
    if (!role) return decoded
    return decoded.role === role
  })
}

module.exports = {
  handleCreateToken,
  verifyToken,
}
