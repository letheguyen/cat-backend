const usersController = require('./users')
const SignInController = require('./signIn')
const SignUpController = require('./signUp')


module.exports = {
  ...usersController,
  ...SignInController,
  ...SignUpController
}