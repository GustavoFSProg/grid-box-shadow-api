import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

async function RegisterEstoque(req: Request, res: Response) {
  try {
    const estoque = await prisma.estoques.create({
      data: {
        idProduct: req.body.id_product,
        qtd: Number(req.body.estoque),
      },
    })
    return res.status(200).json({ msg: 'success', estoque })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getAllEstoque(req: Request, res: Response) {
  try {
    const data = await prisma.estoques.findMany()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send(error)
  }
}


async function deletar(req: Request, res: Response) {
  try {
    const data = await prisma.estoques.deleteMany()

    return res.status(200).send({data, msg: "testando deu certo"})
  } catch (error) {
    return res.status(400).send(error)
  }
}

export default { RegisterEstoque, getAllEstoque, deletar }
