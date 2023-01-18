import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.transactions.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

// async function update(req: Request, res: Response) {
//   try {
//     const data = await prisma.transactions.update({
//       where: { id: req.params.id },
//       data: {
//         price: req.body.price
//       }

//     })

//     return res.status(200).json(data)
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// }

async function register(req: Request, res: Response) {
  try {
    await prisma.transactions.create({
      data: <any>{
        cartCode: req.body.cartCode,
        paymentType: req.body.paymentType,
        status: req.body.status,
        installments: req.body.installments,
        total: Number(req.body.total),
        transactionId: req.body.transactionId,
        processorResponse: req.body.processorResponse,
        customerEmail: req.body.customerEmail,
        customerName: req.body.customerName,
        customerMobile: req.body.customerMobile,
        customerDocument: req.body.customerDocument,
        billingAdress: req.body.billingAdress,
        billingNumber: req.body.billingNumber,
        billingNeightborhood: req.body.billingNeightborhood,
        billingState: req.body.billingState,
        billingCity: req.body.billingCity,
        billingZipCode: req.body.billingZipCode,
      },
    })

    return res.status(200).json({ msg: 'Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function RemoveOnetransactions(req: Request, res: Response) {
  try {
    await prisma.transactions.delete({
      where: { id: req.params.id },
    })

    return res.status(200).json({ msg: 'Deleted Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function RemoveAll(req: Request, res: Response) {
  try {
    await prisma.transactions.deleteMany()

    return res.status(200).json({ msg: 'Deleted Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { getAll, register, RemoveOnetransactions, RemoveAll }
