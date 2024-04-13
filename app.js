const createError = require('http-errors')
const cookieSession = require('cookie-session')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const config = require('./routes/config')
const mongoose = require('mongoose')

mongoose.connect(config.db)
  .then(() => console.log('Connected!'))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))

// main().catch(err => console.log(err))

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test')
 
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

const indexRouter = require('./routes/index')
const newsRouter = require('./routes/news')
const quizRouter = require('./routes/quiz')
const adminRouter = require('./routes/admin')
const apiRouter = require('./routes/api')

const login = 'admin'
//  new password Hnr20IluNknv89pB

// mongodb+srv://admin:<Hnr20IluNknv89pB>@cluster0.egcb7tr.mongodb.net/

//PdXmCULGiyhcFaxi
//mongodb+srv://kmisiejuk15:<PdXmCULGiyhcFaxi>@cluster0.egcb7tr.mongodb.net/

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  cookieSession({
    name: 'session',
    keys: config.keySession,
    maxAge: config.maxAgeSession,
  })
)

app.use(function (req, res, next) {
  res.locals.path = req.path
  next()
})

app.use('/', indexRouter)
app.use('/news', newsRouter)
app.use('/quiz', quizRouter)
app.use('/admin', adminRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
