const express = require('express')
const router = express.Router()
const { APP_URL } = require('../constants')

const {
  getUsers,
  SignIn,
  signUp,
  uploadFile,
  createCategory,
  getCategorys,
  getCategoryDetail,
  deleteCategory,
  updateCategory,
  createProduct,
  getProducts,
  updateStatusCategory,
  signSNS,
  updateShopInformation,
  getShopInformation,
  createRoomChat,
  getRoomChat,
  getDetailRoomChat
} = require('../controllers')
const { uploadSingle } = require('../utils')

// App
router.post(APP_URL.login, SignIn)
router.post(APP_URL.signUp, signUp)
router.post(APP_URL.upload, uploadSingle, uploadFile)
router.get(APP_URL.getShopInfo, getShopInformation)

// Users
router.post(APP_URL.roomChat, createRoomChat)
router.get(APP_URL.roomChat, getRoomChat)
router.get(APP_URL.detailroomChat, getDetailRoomChat)


// Admin
router.get(APP_URL.users, getUsers)
router.get(APP_URL.categorys, getCategorys)
router.get(APP_URL.categorysDetail, getCategoryDetail)
router.post(APP_URL.categorys, createCategory)
router.delete(APP_URL.categorysDetail, deleteCategory)
router.put(APP_URL.categorysDetail, updateCategory)
router.patch(APP_URL.categorysDetail, updateStatusCategory)
router.post(APP_URL.product, createProduct)
router.get(APP_URL.product, getProducts)
router.post(APP_URL.signInSNS, signSNS)
router.put(APP_URL.shopInformation, updateShopInformation)




module.exports = router
