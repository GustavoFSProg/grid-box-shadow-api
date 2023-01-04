"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _userController = require('./userController'); var _userController2 = _interopRequireDefault(_userController);
var _express = require('express');
var _uploadConfig = require('./uploadConfig'); var _uploadConfig2 = _interopRequireDefault(_uploadConfig);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _productsController = require('./productsController'); var _productsController2 = _interopRequireDefault(_productsController);

const routes = _express.Router.call(void 0, )

const upload = _multer2.default.call(void 0, _uploadConfig2.default)

routes.get('/', (req, res) => {
  return res.json({ msg: ` 🍀 Api running` })
})

routes.get('/getall', _userController2.default.getAll)
routes.get('/one', _userController2.default.getOne)
routes.post('/register', _userController2.default.register)
routes.post('/login', _userController2.default.Login)
routes.put('/update/:id', _userController2.default.updates)
routes.delete('/delete/:id', _userController2.default.RemoveUser)

routes.post('/product', upload.single('image'), _productsController2.default.registerPost)
routes.get('/get-product',_productsController2.default.getProduct)
routes.get('/profile/:id',_productsController2.default.profile)



exports. default = routes
