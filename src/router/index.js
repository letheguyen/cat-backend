const express = require('express')
const router = express.Router()
const { APP_URL } = require('../constants')

const { getUsers, SignIn, signUp, uploadFile } = require('../controllers')

// App
router.post(APP_URL.login, SignIn)
router.post(APP_URL.signUp, signUp)
router.post(APP_URL.upload, uploadFile)

// Admin
router.get(APP_URL.users, getUsers)


module.exports = router
