"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

const uploadConfig = {
  // eslint-disable-next-line new-cap
  storage: _multer2.default.diskStorage({
    // destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(_req, file, cb) {
      const [name] = file.originalname.split('.')
      // const filename = `${name}.mp4`
      cb(null, file.originalname)
    },
  }),
}

exports. default = uploadConfig