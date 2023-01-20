import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import * as Yup from 'yup'
import { parsePhoneNumber } from 'libphonenumber-js'
import { cnpj, cpf } from 'cpf-cnpj-validator'
// import transationController from '../Controllers/transationController'
import transationController from '../Controllers/transationController'

const prisma = new PrismaClient()

type TransType = {
  cartCode: String
  paymentType: String
  installments: String
  customer: String
  billing: String
  creditCard: String
  // TransactionsService: any
}


  let dataRegister = null


async function TransactionsService(
  { cartCode,
    paymentType,
    installments,
    customer,
    billing,
    creditCard }: TransType,
  req: Request,
  res: Response
) {
  const object = { cartCode, paymentType, installments, customer, billing, creditCard }

  const Cart = await prisma.cart.findFirst({
    where: {
      id: String(cartCode),
    },
  })

  if (!Cart) {
    return res.status(400).send({ error: 'error' })
  }
 
   
    // if (!dataRegister) {
    //   return res.status(400).send({ error: 'error na transação' })
    // }
    return res.status(200).send({ msg: 'TRansations sucssess!' })
  }


export default  TransactionsService
