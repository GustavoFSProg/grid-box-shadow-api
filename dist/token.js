"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);


 async function generateToken(data) {
  const { email, password } = data
  return _jsonwebtoken2.default.sign({ email, password }, process.env.SECRET , {
    expiresIn: '1d',
  })
} exports.generateToken = generateToken;

 async function verifyToken(token) {
  return (
  _jsonwebtoken2.default.verify(token, process.env.SECRET ) ,
    (error, decode) => {
      if (error) return { error } 
      return { decode } 
    }
  )
} exports.verifyToken = verifyToken;
