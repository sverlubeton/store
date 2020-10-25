const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  if(res.locals.isAuth === undefined) {
    res.locals.isAuth = false
  }
  console.log(res.locals.isAuth);
  res.render('index', {
    title: 'Home',
    isHome: true,
    role: true,
    isAuth: res.locals.isAuth
  })
  
})


module.exports = router