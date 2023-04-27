const jwt = require('./jwt')
const uploadFile = require('./uploadFile')

module.exports = {
  ...jwt,
  ...uploadFile,
}
