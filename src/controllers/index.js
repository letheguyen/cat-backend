const usersController = require('./users')
const SignInController = require('./signIn')
const SignUpController = require('./signUp')
const uploadFile = require('./upload')

module.exports = {
  ...usersController,
  ...SignInController,
  ...SignUpController,
  ...uploadFile,
}
