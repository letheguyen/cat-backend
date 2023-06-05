const usersController = require('./users')
const SignInController = require('./signIn')
const SignUpController = require('./signUp')
const uploadFile = require('./upload')
const category = require('./category')
const product = require('./product')
const shopInformation = require('./shopInformation')

module.exports = {
  ...usersController,
  ...SignInController,
  ...SignUpController,
  ...uploadFile,
  ...category,
  ...product,
  ...shopInformation
}
