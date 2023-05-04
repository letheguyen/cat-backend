const express = require('express')
const router = express.Router()
const { APP_URL } = require('../constants')

const { uploadSingle } = require('../utils')
const {
  getUsers,
  SignIn,
  signUp,
  uploadFile,
  createCategory,
  getCategorys,
  getCategoryDetail,
  deleteCategory,
} = require('../controllers')

// App
router.post(APP_URL.login, SignIn)
router.post(APP_URL.signUp, signUp)
router.post(APP_URL.upload, uploadSingle, uploadFile)

// Admin
router.get(APP_URL.users, getUsers)
router.get(APP_URL.categorys, getCategorys)
router.get(APP_URL.categorysDetail, getCategoryDetail)
router.post(APP_URL.categorys, createCategory)
router.delete(APP_URL.categorysDetail, deleteCategory)

module.exports = router
