import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import * as Yup from 'yup'
import { parsePhoneNumber } from 'libphonenumber-js'
import { cnpj, cpf } from 'cpf-cnpj-validator'

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
    const schema = Yup.object({
      cartCode: Yup.string().required(),
      installments: Yup.number().min(1).when("payment_type",
        (paymentType, schema) => paymentType === "credit_card" ? schema.max(12) :
         schema.max(1)
        ),
      total: Yup.string().required(),
      paumentType: Yup.mixed().oneOf(["billet", "credit_card"]).required(),
      customerName: Yup.string().min(3),
      customerEmail: Yup.string().required().email(),
      customerMobile: Yup.string().required()
        .test("is-valid-mobile",
        "${path} is not a valide mobile number",
          (value: any) => parsePhoneNumber(value, "BR").isValid()),
       customerDocument: Yup.string().required()
        .test("is-valid-document",
        "${path} is not a valide CPF / CNPJ",
          (value: any) => cpf.isValid(value) || cnpj.isValid(value)),  
       
        billingAdress: Yup.string().required(),
        billingNumber: Yup.string().required(),
        billingNeightborhood: Yup.string().required(),
        billingState: Yup.string().required(),
        billingCity: Yup.string().required(),
      billingZipCode: Yup.string().required(), 
      creditCardNumber: Yup.string()
        .when("paymentType", (paymentType, schema) => {
        return paymentType === "credit_card" ?   schema.required() : schema
        }),
      
       creditCardExpiration: Yup.string()
        .when("paymentType", (paymentType, schema) => {
        return paymentType === "credit_card" ?   schema.required() : schema
        }),
        creditCardHolderName: Yup.string()
        .when("paymentType", (paymentType, schema) => {
        return paymentType === "credit_card" ?   schema.required() : schema
        }),
         creditCardCvv: Yup.string()
        .when("paymentType", (paymentType, schema) => {
        return paymentType === "credit_card" ?   schema.required() : schema
      })
    })
       
    
    if (!(await schema.isValid(req.body))) {
      return res.json({msg:  "Erro on Validate Schema"})
    }
    else {
      return res.json({msg: "Schema Success"})
      
    }

    // await prisma.transactions.create({
    //   data: <any>{
    //     cartCode: req.body.cartCode,
    //     paymentType: req.body.paymentType,
    //     status: req.body.status,
    //     installments: req.body.installments,
    //     total: Number(req.body.total),
    //     transactionId: req.body.transactionId,
    //     processorResponse: req.body.processorResponse,
    //     customerEmail: req.body.customerEmail,
    //     customerName: req.body.customerName,
    //     customerMobile: req.body.customerMobile,
    //     customerDocument: req.body.customerDocument,
    //     billingAdress: req.body.billingAdress,
    //     billingNumber: req.body.billingNumber,
    //     billingNeightborhood: req.body.billingNeightborhood,
    //     billingState: req.body.billingState,
    //     billingCity: req.body.billingCity,
    //     billingZipCode: req.body.billingZipCode,
    //   },
    // })
  

    // return res.status(200).json({ msg: 'Success!!' })
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
