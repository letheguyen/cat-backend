const pathName = require('./pathName')
const common = require('./common')
const errorCode = require('./errorCode')
const category = require('./category')
const defaultData = require('./defaultData')

module.exports = {
  ...pathName,
  ...common,
  ...errorCode,
  ...category,
  ...defaultData
}