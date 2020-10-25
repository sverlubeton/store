const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const courseRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')
const fileMiddleware = require('./middleware/file')
const cookieParser = require('cookie-parser')
const usersRoutes = require('./routes/users')
const orderUsers = require('./routes/orders-users')

const PORT = process.env.PORT || 3000
const {Router} = require('express')
const router = Router()

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: require('./utils/hbs-helpers')
})
const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(fileMiddleware.single('avatar'))
app.use(cookieParser())
app.use(csrf( {cookie : true}))

app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)


app.use('/', authRoutes)
app.use('/add', addRoutes)
app.use('/laptops', courseRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/users', usersRoutes)
app.use('/order-users', orderUsers)
app.get('/', (req, res ) => {
  if(res.locals.isAuth){
    res.redirect('/laptops')
  } else{
  res.redirect('/auth/login#login')
  }
})


app.use(errorHandler)

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      
      
    })
  } catch (e) {
    console.log(e)
  }
}
///c/Users/Константин/mongodb/bin/mongod.exe --dbpath=/c/Users/Константин/mongodb-data

start()


