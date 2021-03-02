require('dotenv').config()

const express = require('express')
const app = express()
const passport = require('passport')
require('./passport/passport')(passport)
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const AzureTablesStoreFactory = require('connect-azuretables')(session)
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieSettings = require('./config').cookieSettings
const errorHandlingMiddleware = require('./middleware/error')
const path = require('path')

app.use(cookieParser('foo'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('uploads'));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true,
    debug: true
}))
app.use(errorHandlingMiddleware())

app.use(morgan('dev'))

if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: 'http://localhost:8080' , credentials :  true}))
}

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(express.static('./server/static/'))

app.use(session({ 
    secret: 'keyboard cat', 
    cookie: cookieSettings, 
    resave: true, 
    saveUninitialized: true,
    store: AzureTablesStoreFactory.create({
        sessionTimeOut: 60
    })
}))

app.use(passport.initialize())
app.use(passport.session())



// Routes
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

const videoApi = require('./routes/video')
app.use('/api/v1/video', videoApi)

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
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Server
app.listen(8080, () => {
    console.log('Server is available on PORT: ' + 8080)
})
