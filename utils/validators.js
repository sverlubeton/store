const {body} = require('express-validator/check') 
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Type correct email')
    .custom(async (value, {req}) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          return Promise.reject('This email already exists')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(),
  body('password', 'Password should contain at least 6 symbols')
    .isLength({min: 6, max: 56})
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Passwords should match')
      }
      return true
    })
    .trim(),
  body('name')
    .isLength({min: 3}).withMessage('Name should contain at least 3 symbols')
    .trim()
]
exports.resetValidators = [
  body('password', 'Password should contain at least 6 symbols')
    .isLength({min: 6, max: 56})
    .isAlphanumeric()
    .trim()
]

exports.courseValidators = [
  body('title').isLength({min: 3}).withMessage('Минимальная длинна названия 3 символа').trim(),
  body('price').isNumeric().withMessage('Введите корректную цену'),
  body('img', 'Введите корректный Url картинки').isURL()
]