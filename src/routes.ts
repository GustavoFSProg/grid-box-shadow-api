import userController from './userController'
import { Request, Response, Router } from 'express'
import uploadConfig from './uploadConfig'
import multer from 'multer'
import productsController from './productsController'

const routes = Router()

const upload = multer(uploadConfig)

routes.get('/', (req: Request, res: Response) => {
  return res.json({ msg: ` 🍀 Api running` })
})

routes.get('/getall', userController.getAll)
routes.get('/one', userController.getOne)
routes.post('/register', userController.register)
routes.post('/login', userController.Login)
routes.put('/update/:id', userController.updates)
routes.delete('/delete/:id', userController.RemoveUser)

routes.post('/product', upload.single('image'), productsController.registerPost)
routes.get('/get-products',productsController.getProduct)
routes.get('/profile/:id',productsController.profile)



export default routes
