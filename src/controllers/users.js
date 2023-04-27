const Users = require('../models/users')

const getUsers = async (req, res) => {
  try {
    const users = await Users.find()
    return res.status(200).json(users)
  } catch (err) {
    return res.status(400).json({
      message: 'Add user error',
    })
  }
}

module.exports = {
  getUsers,
}
