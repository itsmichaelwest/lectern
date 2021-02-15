const express = require('express')
const app = express()
const passport = require('passport')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

require('dotenv').config()

const serverPort = require('./config').serverPort
const sessionSecret = require('./config').jwtSecret
const cookieSettings = require('./config').cookieSettings

const port = process.env.PORT || serverPort

const errorHandlingMiddleware = require('./middleware/error')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: sessionSecret, cookie: cookieSettings }))

const path = require('path')

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(express.static('./server/static/'))
//app.use(express.static('./client/src/'))

/*
app.use('/app', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
*/

require('./passport/passport')(passport)

app.use(passport.initialize())
app.use(passport.session())

const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

const videoRoutes = require('./video/video-api')
app.use('/vapi', videoRoutes)

app.use(errorHandlingMiddleware())

app.listen(port, () => {
    console.log('App available on PORT: ' + port)
})
