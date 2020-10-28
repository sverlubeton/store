const {Router} = require('express')
const {validationResult} = require('express-validator/check')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const router = Router()

router.get('/', auth, async (req, res) => {
  res.render('add', {
    title: 'Add laptop',
    role: true,
    isAdd: true
  })
})

router.post('/', auth, courseValidators, async (req, res) => {
  const errors = validationResult(req)
  const images = req.body.img.split(',')
  if (!errors.isEmpty()) {
    return res.status(422).render('add', {
      title: 'Add laptop',
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        price: req.body.price,
        img: images
      }
    })
  }

  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: images,
    userId: req.user,
    description: req.body.description,
    display: req.body.display,
    core: req.body.core, 
    RAM: req.body.RAM,
    OC: req.body.OC,
    video: req.body.video,
    color: req.body.color,
    keyboard: req.body.keyboard,
    harddrive: req.body.harddrive,
    ports: req.body.ports,
    battery: req.body.battery,
    weight: req.body.weight,
  })

  try {
    await course.save()
    res.redirect('/laptops')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router