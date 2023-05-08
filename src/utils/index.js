const jwt = require('./jwt')
const uploadFile = require('./uploadFile')
const convertObject = require('./convertObject')
const checkUrlRequest = require('./checkUrlRequest,')

module.exports = {
  ...jwt,
  ...uploadFile,
  ...convertObject,
  ...checkUrlRequest
}
