const Users = require('../models/users')

const signUp = async (req, res) => {
  try {
    return res.status(400).json({ message: 'Account already exists' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  signUp,
}
