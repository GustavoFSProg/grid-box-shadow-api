import userController from './Controllers/userController'
import { Request, Response, Router } from 'express'
import uploadConfig from './uploadConfig'
import multer from 'multer'
import productsController from './Controllers/productsController'
import estoqueController from './Controllers/estoqueController'
import categoryController from './Controllers/categoryController'
import cartController from './Controllers/cartController'
import transationController from './Controllers/transationController'
import TransactionsService from './services/transactionService'

const routes = Router()

const upload = multer(uploadConfig)

routes.get('/', (req: Request, res: Response) => {
  return res.json({ msg: ` 🍀 Api running` })
})

routes.get('/get-users', userController.getAll)
routes.get('/one', userController.getOne)
routes.post('/register', userController.register)
routes.post('/login', userController.Login)
routes.put('/update/:id', userController.updates)
routes.delete('/delete', userController.RemoveUser)

routes.post('/product', upload.single('image'), productsController.registerPost)
routes.get('/get-products',productsController.getProduct)
routes.get('/profile/:id',productsController.profile)
routes.put('/update-product/:id', upload.single('image'), productsController.UpdateProduct)

routes.post('/register-estoque', estoqueController.RegisterEstoque)
routes.get('/get-estoque', estoqueController.getAllEstoque)
routes.delete('/del', estoqueController.deletar)

routes.get('/get-categorys', categoryController.getAll)
routes.post('/register-category', categoryController.register)

routes.post('/register-cart', cartController.register)
routes.get('/get-cart', cartController.getAll)
routes.delete('/delete-cart/:id', cartController.RemoveOneCart)
routes.put('/update-cart/:id', cartController.update)

routes.post('/register-trans', transationController.registerTransacitons)
routes.get('/get-trans', transationController.getAll)
routes.delete('/remover-trans', transationController.RemoveAll)






export default routes
