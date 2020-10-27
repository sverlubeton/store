const {Router} = require('express')
const {validationResult} = require('express-validator/check')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const router = Router()

{/* <ul class="pagination">
  <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
  {{#each newArr as |item index|}}
    <li class="waves-effect" data-index={{item}}>{{item}}</li>
  {{/each}}
  </ul> */}

router.get('/', async (req, res) => {
  try {
    /* const courses = await Course.find() */
    const {skip} = req.query
    const allcourses = await Course.find({}).countDocuments()
    const paginationItemsLength = Math.ceil(allcourses/5)
    const newArr =  new Array(paginationItemsLength).fill(0).map((item, index) => index+1)
    const activePaginationItem = (allcourses - skip)/5
    //const courses = await Course.find({},null,{limit: 5,skip : skip ? ((+skip-1)*5) : 0})
    const courses = await Course.find() 
    .populate('userId', 'email name')
    .select('price title img ')
    res.render('courses', {
      title: 'Laptops',
      isCourses: true,
      userId: req.user ? req.user._id.toString() : null,
      courses,
      role: req.user.role,
      paginationItemsLength,
      activePaginationItem,
      newArr,
      pagination: { page: 1, limit:2, queryParams: skip }
    })
  } catch (e) {
    console.log(e)
  }
  
})

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  try {
    const course = await Course.findById(req.params.id)
    /* if (!isOwner(course, req)) {
      return res.redirect('/laptops')
    } */

    res.render('course-edit', {
      title: `Edit ${course.title}`,
      course,
      role: req.user.role,
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/edit', auth, courseValidators, async (req, res) => {
  const errors = validationResult(req)
  const {id} = req.body

  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/laptops/${id}/edit?allow=true`)
  }

  try {
    delete req.body.id
    const course = await Course.findById(id)
   /*  if (!isOwner(course, req)) {
      return res.redirect('/laptops')
    } */
    const images = req.body.img.split(',')
    req.body.img = images
    Object.assign(course, req.body)
    await course.save()
    res.redirect('/laptops')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id,
      userId: req.user._id
    })
    res.redirect('/laptops')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.render('course', {
      title: `Laptop ${course.title}`,
      course,
      role: req.user.role
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router