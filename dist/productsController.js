"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _client = require('@prisma/client');


const prisma = new (0, _client.PrismaClient)()

var cloudinary = require('cloudinary')

var imagem = ''
var resultado = ''

async function getProduct(req, res) {
  try {
    const data = await prisma.products.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function profile(req, res) {
  try {
    const data = await prisma.products.findFirst({
      where: { id: req.params.id },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function registerPost(req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  cloudinary.uploader.upload(_optionalChain([req, 'access', _ => _.file, 'optionalAccess', _2 => _2.path]), function (result, error) {
    imagem = result.secure_url
    resultado = result
    console.log(resultado)
  })
  try {
    const post = await prisma.products.create({
      data: {
        title: req.body.title,
        image: imagem,
        desc: req.body.desc,
        price: req.body.price,
      },
    })

    return res.status(201).send({ post })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

exports. default = { registerPost, getProduct, profile }
