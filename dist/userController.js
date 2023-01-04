"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _md5 = require('md5'); var _md52 = _interopRequireDefault(_md5);
var _token = require('./token');
var _client = require('@prisma/client');

const prisma = new (0, _client.PrismaClient)()

async function getAll(req, res) {
  try {
    const data = await prisma.users.findMany({
      select: {
        name: true,
        email: true,
      },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getOne(req, res) {
  try {
    const data = await prisma.users.findFirst({
      where: { name: req.body.name },

      select: {
        name: true,
        email: true,
      },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function Login(req, res) {
  try {
    const data = await prisma.users.findFirst({
      where: {
        email: req.body.email,
        password: String(_md52.default.call(void 0, req.body.password, process.env.SECRET )),
      },

      select: {
        name: true,
        email: true,
      },
    })

   const token = await _token.generateToken.call(void 0, data)

    return res.status(200).json({data, token})
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function RemoveUser(req, res) {
  try {
    await prisma.users.delete({
      where: { id: req.params.id },
    })

    return res.status(200).json({ msg: 'Deleted Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function updates(req, res) {
  try {
    await prisma.users.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    })

    return res.status(200).json({ msg: 'Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function register(req, res) {
  try {
    await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(_md52.default.call(void 0, req.body.password, process.env.SECRET )),
      },
    })

    return res.status(200).json({ msg: 'Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

exports. default = { getAll, Login, RemoveUser, getOne, updates, register }
