const express = require('express')
const router = express.Router()
const { APP_URL } = require('../constants')

const { getUsers, SignIn, signUp } = require('../controllers')

// App
router.post(APP_URL.login, SignIn)
router.post(APP_URL.signUp, signUp)

// Admin
router.get(APP_URL.users, getUsers)


module.exports = router
