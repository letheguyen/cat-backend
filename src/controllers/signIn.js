const { handleCreateToken } = require('../utils')
const Users = require('../models/users')
const { DEFAULT_FIELD } = require('../constants')

const SignIn = async (req, res) => {
  try {
    const data = req.body
    const userLogin = await Users.findOne(
      {
        email: data.email,
        password: data.password,
        uid: DEFAULT_FIELD.uid,
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

const signSNS = async (req, res) => {
  try {
    const dataBoy = {
      ...req.body,
      userName: req.body.userName ? req.body.userName : DEFAULT_FIELD.userName,
      email: req.body.email ? req.body.email : DEFAULT_FIELD.email,
      phone: req.body.phone ? req.body.phone : DEFAULT_FIELD.phone,
      password: req.body.password ? req.body.password : DEFAULT_FIELD.password,
    }

    const userLogin = await Users.findOneAndUpdate(
      {
        uid: dataBoy.uid,
      },
      {
        $set: dataBoy,
      },
      {
        password: false,
      }
    )

    const handleRender = (dataUser) => {
      return {
        userName:
          dataUser.userName === DEFAULT_FIELD.userName
            ? null
            : dataUser.userName,
        email: dataUser.email === DEFAULT_FIELD.email ? null : dataUser.email,
        role: dataUser.role,
      }
    }

    if (userLogin) {
      const token = handleCreateToken(handleRender(userLogin))
      return res.status(200).json({ data: handleRender(userLogin), token })
    }

    const dataCreate = await Users.create(dataBoy)
    const token = handleCreateToken(handleRender(dataCreate))

    return res.status(200).json({ data: handleRender(dataCreate), token })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', err })
  }
}

module.exports = {
  SignIn,
  signSNS,
}
