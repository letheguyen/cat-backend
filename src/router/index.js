const express = require('express')
const router = express.Router()
const { APP_URL } = require('../constants')

const { getUsers, SignIn } = require('../controllers')

// App
router.post(APP_URL.login, SignIn)


router.get('/users', getUsers)


module.exports = router
