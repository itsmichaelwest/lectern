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
const errorHandlingMiddleware = require('./middleware/error')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET || 'foo'))
app.use(errorHandlingMiddleware())

// Use logging
app.use(morgan('dev'))

// If running in development environment, use cors to resolve cross-origin
// errors.
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: 'http://localhost:8080' , credentials :  true}))
}

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(express.static('./server/static/'))

// Session storage configuration.
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'foo', 
    cookie: {
        maxAge: 604800000
    },
    resave: true, 
    saveUninitialized: true,
    store: AzureTablesStoreFactory.create({
        sessionTimeOut: 60
    })
}))

// Configure and use passport.js.
app.use(passport.initialize())
app.use(passport.session())

// Routes
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)
const videoApi = require('./routes/video')
app.use('/api/v1/video', videoApi)
const commentApi = require('./routes/comment')
app.use('/api/v1/comment', commentApi)
const channelApi = require('./routes/channel')
app.use('/api/v1/channel', channelApi)

// If path not defined in any of the above routes, serve index.html
// from the build folder.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

module.exports = app