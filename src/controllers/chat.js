const Users = require('../models/users')
const Rooms = require('../models/rooms')
const Chat = require('../models/chat')

const {
  ERROR_CODE,
  ADMIN_ROLE,
  MESSAGE_WELCOME,
  DEFAULT_ROLE,
} = require('../constants')
const { verifyToken } = require('../utils')

const createRoomChat = async (req, res) => {
  try {
    const id = req.body.idUser
    const user = await Users.findById(id)
    const admin = await Users.findOne({ role: ADMIN_ROLE })
    const oldRoom = await Rooms.findOne({ userId: user?._id })

    if (oldRoom) {
      return res.status(400).json(ERROR_CODE.ACTION_FAILURE)
    }

    const newRooms = await Rooms.create({
      name: user?.userName,
      userId: user?._id,
      seller: admin?._id,
      roomImage: user?.avatar,
    })

    await Chat.create({
      idRoom: newRooms._id,
      from: admin._id,
      to: user._id,
      idUserCreate: user._id,
      message: MESSAGE_WELCOME,
      created: Date.now(),
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
    const data = verifyToken(req, undefined, undefined)
    const lengthRooms = await Rooms.find({})

    if (data && data.role === ADMIN_ROLE) {
      const dataRoom = await Rooms.find({})
        .sort({ timeSend: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(limit)

      return res.status(200).json({
        data: dataRoom,
        pagination: {
          totalPage: lengthRooms.length
            ? Math.ceil(lengthRooms.length / limit)
            : 0,
          limit: Number(limit),
          page: Number(page),
        },
      })
    }

    const dataRoom = await Rooms.findOne({
      userId: data._id,
    })
    return res.status(200).json(dataRoom)
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
      errorCode: ERROR_CODE.ERROR_SERVER.errorCode,
    })
  }
}

const getDetailRoomChat = async (req, res) => {
  try {
    const { page, limit } = req.query
    const id = req.params.id

    const lengthChat = await Chat.find({ idRoom: id })
    const dataChat = await Chat.find({
      idRoom: id,
    })
      .sort({ created: -1 })
      .skip((Number(page ? page : 1) - 1) * Number(limit))
      .limit(limit)

    return res.status(200).json({
      data: dataChat.reverse(),
      pagination: {
        totalPage: lengthChat ? Math.ceil(lengthChat.length / limit) : 0,
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

const saveChat = async (data) => {
  try {
    if (!data.length) return
    const arrayIdRoom = data.map((chat) => chat.idRoom)
    await Rooms.updateMany(
      { _id: { $in: arrayIdRoom } },
      { timeSend: Date.now() }
    )

    return await Chat.insertMany(data)
  } catch (err) {
    return null
  }
}

module.exports = {
  createRoomChat,
  getRoomChat,
  getDetailRoomChat,
  saveChat,
}
