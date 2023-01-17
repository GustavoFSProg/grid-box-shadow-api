import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from './token'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.cart.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function update(req: Request, res: Response) {
  try {
    const data = await prisma.cart.update({
      where: { id: req.params.id },
      data: {
        price: req.body.price
      }

    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}





async function register(req: Request, res: Response) {
  try {

    await prisma.cart.create({
      data:<any> {
        price: Number(req.body.price),

      },
    })

    return res.status(200).json({ msg: 'Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}


async function RemoveOneCart(req: Request, res: Response) {
  try {
    await prisma.cart.delete({
      where: { id: req.params.id}
    })

    return res.status(200).json({ msg: 'Deleted Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}


async function RemoveCart(req: Request, res: Response) {
  try {
    await prisma.cart.deleteMany()

    return res.status(200).json({ msg: 'Deleted Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { getAll,register, RemoveOneCart, update, RemoveCart }
