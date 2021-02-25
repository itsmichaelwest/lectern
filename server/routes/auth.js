const express = require('express')
const router = new express.Router()
const passport = require('passport')
const authCheckMiddleware = require('../middleware/auth-check')
const sql = require('../database/user')
const querystring = require('querystring')
const request = require('request')

// Get login request
router.get('/login', (req, res) => {
    res.json({ message: 'Request login' })
})


// Get login MSFT
router.get('/microsoft', (req, res, next) => {
    passport.authenticate('azuread-openidconnect',
        {
            response: res,
            failureRedirect: '/'
        })(req, res, next)
    },
    function(req, res) {
        res.redirect('/')
    }
)


// Callback
router.get('/microsoft/callback',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )(req, res, next)
    },
    function(req, res) {
        res.redirect('/')
    }
)


// Callback POST
router.post('/microsoft/callback',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )(req, res, next)
    },
    function(req, res) {
        res.redirect('/')
    }
)


// Retrieves an access token for use in Microsoft Graph API calls
router.get('/microsoft/token', authCheckMiddleware(), (req, res) => {
    getAccessToken(req.session.passport.user.oid, (err, token) => {
        res.send(token)
    })
})


// Retrieves Microsoft Graph user information
router.get('/microsoft/graph', authCheckMiddleware(), (req, res) => {
    getAccessToken(req.session.passport.user.oid, (err, token) => {
        request({
            headers: {
                'Authorization': `Bearer ${token}`
            },
            uri: 'https://graph.microsoft.com/v1.0/me',
            method: 'GET'
        }, (err, subRes, body) => {
            if (err) {
                console.error(err)
                throw err
            } else {
                res.status(200).send(JSON.parse(body))
            }
        })
    })
})


// Test call to check access token, get a profile picture from graph
router.get('/microsoft/avatar', authCheckMiddleware(), (req, res) => {
    getAccessToken(req.session.passport.user.oid, (err, token) => {
        request({
            headers: {
                'Authorization': `Bearer ${token}`
            },
            uri: 'https://graph.microsoft.com/v1.0/me/photo/$value',
            method: 'GET'
        }, (err, subRes, body) => {
            if (err) {
                console.error(err)
                throw err
            } else {
                res.send(body)
            }
        })
    })
})

// Get access token from Microsoft
function getAccessToken(user, callback) {
    sql.getUserRefreshToken(user, (err, data) => {
        const requestData = querystring.stringify({
            'client_id': `${process.env.MICROSOFT_GRAPH_CLIENT_ID}`,
            'refresh_token': `${data}`,
            'grant_type': 'refresh_token',
            'client_secret': `${process.env.MICROSOFT_GRAPH_CLIENT_SECRET}`
        })

        request({
            headers: {
                'Content-Length': requestData.length,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            body: requestData,
            method: 'POST'
        }, (err, subRes, body) => {
            if (err) {
                console.error(err)
                callback(err)
            } else {
                var data = JSON.parse(body);
                callback(false, data.access_token)
            }
        })
    })
}


// Get user information
router.get('/user', authCheckMiddleware(), (req, res) => {
    res.json(req.session.passport)
})


// Logout, check the user is actually logged in first though.
router.get('/logout', authCheckMiddleware(), function(req, res) {
    req.session.destroy(function(err) {
        req.logOut()
        res.redirect('/')
    })
})

module.exports = router
