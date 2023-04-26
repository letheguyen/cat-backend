const Users = require('../models/users')

const getUsers = async (req, res) => {
  try {
    const data = {a: 'sfs'}

    return res.status(200).json(data)
  } catch (err) {
    return res.status(400).json({
      message: 'Add user error',
    })
  }
}

module.exports = {
  getUsers,
}
