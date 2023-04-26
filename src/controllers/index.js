const usersController = require('./users')
const SignInController = require('./signIn')

module.exports = {
  ...usersController,
  ...SignInController
}