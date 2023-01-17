import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from './token'
import { PrismaClient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

const prisma = new PrismaClient()

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.cart.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

// async function getOne(req: Request, res: Response) {
//   try {
//     const data = await prisma.cart.findFirst({
//       where: { product_id: req.body.produto_id },

//     })

//     return res.status(200).json(data)
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// }




// async function updates(req: Request, res: Response) {
//   try {
//     await prisma.cart.update({
//       where: { id: req.params.id },
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//         role: req.body.role,
//       },
//     })

//     return res.status(200).json({ msg: 'Success!!' })
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// }

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


async function RemoveCart(req: Request, res: Response) {
  try {
    await prisma.cart.deleteMany()

    return res.status(200).json({ msg: 'Deleted Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { getAll,register, RemoveCart }
