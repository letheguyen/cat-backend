const pathName = require('./pathName')
const common = require('./common')
const errorCode = require('./errorCode')
const category = require('./category')

module.exports = {
  ...pathName,
  ...common,
  ...errorCode,
  ...category
}