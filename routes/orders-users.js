const {Router} = require('express')
const Orders = require('../models/order')
const auth = require('../middleware/auth')
const router = Router()


router.get('/', auth, async (req, res) => {
    try {
      const orders = await Orders.find({})
      .populate('user.userId')  
      res.render('order-users', {
        isOrdersUsers: true,
        title: 'Order-users',
        orders: orders.map(o => {
          return {
            ...o._doc,
            price: o.courses.reduce((total, c) => {
              return total += c.count * c.course.price
            }, 0)
          }
        }),
        role: req.user.role,
    })
    } catch (e) {
      console.log(e)
    }
  })










module.exports = router