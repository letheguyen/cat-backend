const express = require('express')
const router = express.Router()
const { APP_URL } = require('../constants')

const { uploadSingle } = require('../utils')
const { getUsers, SignIn, signUp, uploadFile, createCategory } = require('../controllers')

// App
router.post(APP_URL.login, SignIn)
router.post(APP_URL.signUp, signUp)
router.post(APP_URL.upload, uploadSingle, uploadFile)

// Admin
router.get(APP_URL.users, getUsers)

router.post(APP_URL.createCategory, createCategory)


module.exports = router
