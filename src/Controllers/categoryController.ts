import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.categorys.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getOne(req: Request, res: Response) {
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

async function updates(req: Request, res: Response) {
  try {
    await prisma.users.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      },
    })

    return res.status(200).json({ msg: 'Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function register(req: Request, res: Response) {
  try {
    await prisma.categorys.create({
      data: {
        name: req.body.name,
      },
    })

    return res.status(200).json({ msg: 'Success Category!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { getAll, getOne, updates, register }
