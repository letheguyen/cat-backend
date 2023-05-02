const usersController = require('./users')
const SignInController = require('./signIn')
const SignUpController = require('./signUp')
const uploadFile = require('./upload')
const category = require('./category')

module.exports = {
  ...usersController,
  ...SignInController,
  ...SignUpController,
  ...uploadFile,
  ...category
}
