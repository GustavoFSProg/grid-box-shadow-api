import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../token'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.users
      .findMany
       ({ select: {
          id: true,
          name: true,
          email: true,
          role: true,
          city: true,
          state: true,
        }})
      

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getOne(req: Request, res: Response) {
  try {
    const data = await prisma.users.findFirst({
      where: { name: req.body.name },

      // select: {
      //   name: true,
      //   email: true,
      // },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function Login(req: Request, res: Response) {
  try {
    const data = await prisma.users.findFirst({
      where: {
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },

      select: {
        name: true,
        email: true,
      },
    })

    const token = await generateToken(data)

    return res.status(200).json( token)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function RemoveUser(req: Request, res: Response) {
  try {
    await prisma.users.deleteMany()

    return res.status(200).json({ msg: 'Deleted Success!!' })
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

const datas = await prisma.users.findFirst({
      where: { email: req.body.email },

})
    
    console.log(datas)
    
    if (datas === null) {

       await prisma.users.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
          cpf: req.body.cpf,
          street: req.body.street,
          bairro: req.body.bairro,
          city: req.body.city,
          state: req.body.state,
          number: req.body.number,
          complemento: req.body.complemento,
          celular: req.body.celular,
          fone: req.body.fone,
          cep: req.body.cep,
          password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
        },
      })
  
    }
    else {
      return res.status(400).json({ msg: "Email ja existente!" })

     
    
    }

    return res.status(200).json({ msg: 'Success!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { getAll, Login, RemoveUser, getOne, updates, register }
