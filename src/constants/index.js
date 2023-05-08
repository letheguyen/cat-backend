const pathName = require('./pathName')
const common = require('./common')
const errorCode = require('./errorCode')

module.exports = {
  ...pathName,
  ...common,
  ...errorCode
}