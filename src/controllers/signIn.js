const { handleCreateToken } = require('../utils')
const Users = require('../models/users')

const SignIn = async (req, res) => {
  try {
    const data = req.body
    const userLogin = await Users.findOne(
      {
        email: data.email,
        password: data.password,
      },
      {
        password: false,
      }
    )

    if (userLogin) {
      const token = handleCreateToken({
        userName: userLogin.userName,
        email: userLogin.email,
        role: userLogin.role,
      })
      return res.status(200).json({ data: userLogin, token })
    }

    return res.status(400).json({ message: 'Incorrect account information' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', err })
  }
}

module.exports = {
  SignIn,
}
