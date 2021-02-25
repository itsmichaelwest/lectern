const express = require('express')
const app = express()
const passport = require('passport')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const AzureTablesStoreFactory = require('connect-azuretables')(session)

require('dotenv').config()

const cookieSettings = require('./config').cookieSettings

const port = 8080

var azOptions = {
    logger: console.log,
    errorLogger: console.log,
    sessionTimeOut: 60
};

const errorHandlingMiddleware = require('./middleware/error')

app.use(morgan('dev'))
app.use(cookieParser('foo'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



const path = require('path')

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(express.static('./server/static/'))

require('./passport/passport')(passport)

app.use(session({ 
    secret: 'keyboard cat', 
    cookie: cookieSettings, 
    resave: true, 
    saveUninitialized: true,
    store: AzureTablesStoreFactory.create(azOptions)
}))
app.use(passport.initialize())
app.use(passport.session())

// Authentication API
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

// Misc API routes, often for one-off things.
const miscRoutes = require('./routes/_misc')
app.use('/api/v1', miscRoutes)

// Video API
const videoApi = require('./routes/video')
app.use('/api/v1/video', videoApi)

// Comment API
const commentApi = require('./routes/comment')
app.use('/api/v1/comments', commentApi)

// Channel API
//const channelApi = require('./routes/channel')
//app.use('/api/v1/channel', channelApi)

// User API
//const userApi = require('./routes/user')
//app.use('/api/v1/user', userApi)

// If path not defined in any of the above routes, serve index.html
// from the build folder.
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use(errorHandlingMiddleware())
app.listen(port, () => {
    console.log('Server is available on PORT: ' + port)
})
