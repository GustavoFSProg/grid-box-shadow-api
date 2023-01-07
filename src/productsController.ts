import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

var cloudinary = require('cloudinary')

var imagem = ''
var resultado = ''

async function getProduct(req: Request, res: Response) {
  try {
    const data = await prisma.products.findMany({
      take: 6
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function profile(req: Request, res: Response) {
  try {
    const data = await prisma.products.findFirst({
      where: { id: req.params.id },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function registerPost(req: Request, res: Response) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
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
        price: Number(req.body.price),
      },
    })

    return res.status(201).send({ post })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}


async function UpdateProduct(req: Request, res: Response) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
    imagem = result.secure_url
    resultado = result
    console.log(resultado)
  })
  try {

    
    const post = await prisma.products.update({
            where: { id: req.params.id },

      data: {
        title: req.body.title,
        image: imagem,
        desc: req.body.desc,
        price: Number(req.body.price),
      },
    })

    return res.status(201).send({ post })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

export default { registerPost, UpdateProduct, getProduct, profile }
