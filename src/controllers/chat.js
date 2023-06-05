const Users = require('../models/users')
const Rooms = require('../models/rooms')
const Chat = require('../models/chat')

const { ERROR_CODE, ADMIN_ROLE, CHAT } = require('../constants')
const { verifyToken } = require('../utils')

const createRoomChat = async (req, res) => {
  try {
    const id = req.body.idUser
    const user = await Users.findById(id)
    await Rooms.create({
      roomName: user.userName,
      idUser: user._id,
      avatarUser: user.avatar,
    })
    return res.status(200).json(ERROR_CODE.CREATE_SUCCESS)
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

const getRoomChat = async (req, res) => {
  try {
    const { page, limit } = req.query
    const data = verifyToken(req)

    const lengthRooms = await Rooms.find({})

    if (data?.role === ADMIN_ROLE) {
      const dataRoom = await Rooms.find(
        {},
        {
          __v: false,
        }
      )
        .skip((Number(page) - 1) * Number(limit))
        .limit(limit)

      return res.status(200).json({
        data: dataRoom,
        pagination: {
          totalPage: lengthRooms.length,
          limit: Number(limit),
          page: Number(page),
        },
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

const getDetailRoomChat = async (req, res) => {
  try { 
    const data = verifyToken(req)
    const { page, limit } = req.query
    const id = req.params.id

    if (data?.role === ADMIN_ROLE) {
      const lengthChat = await Chat.findById(id)

      const dataChat = await Chat.findById(id)
        .skip((Number(page ? page : 1) - 1) * Number(limit))
        .limit(limit)

      return res.status(200).json({
        data: dataChat,
        pagination: {
          totalPage: lengthChat.length,
          limit: Number(limit),
          page: Number(page),
        },
      })
    }

    const lengthChat = await Chat.findOne({
      idUserCreate: id,
    })

    const dataChat = await Chat.findOne({
      idUserCreate: id,
    })
      .skip((Number(page ? page : 1) - 1) * Number(limit))
      .limit(limit)

    return res.status(200).json({
      data: dataChat,
      pagination: {
        totalPage: lengthChat ? lengthChat.length : 0,
        limit: Number(limit),
        page: Number(page),
      },
    })
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

module.exports = {
  createRoomChat,
  getRoomChat,
  getDetailRoomChat,
}
