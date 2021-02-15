const express = require('express')
const router = new express.Router()
const passport = require('passport')

const cors = require('cors')

// const authCheckMiddleware = require("../middleware/auth-check")


// Get login request
router.get('/login', (req, res) => {
    res.json({ message: 'Request login' })
})


// Get login MSFT
router.get('/microsoft', 
    cors(),
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )(req, res, next)
    },
    function(req, res) {
        console.log('Login was called')
        res.redirect('/')
    }
)


// Callback
router.get('/microsoft/callback',
    cors(),
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )(req, res, next)
    },
    function(req, res) {
        console.log('We received a return from AzureAd')
        res.redirect('/')
    }
)


// Callback POST
router.post('/microsoft/callback',
    cors(),
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )(req, res, next)
    },
    function(req, res) {
        console.log('We received a return from AzureAD')
        res.redirect('/')
    }
)


router.get('/microsoft/avatar',
    cors(),
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )
        console.log('LOOK AT ME XDDDD')
        console.log(res)
    },
    function(req, res){
        console.log('Return from AzureAD')
        console.log(res)    
    }
)


// Logout
router.get('/logout', cors(), function(req, res) {
    req.session.destroy(function(err) {
        req.logOut()
        res.redirect('/')
    })
})

module.exports = router
