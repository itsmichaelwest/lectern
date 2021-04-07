const express = require('express')
const router = new express.Router()
const passport = require('passport')
const authCheckMiddleware = require('../middleware/auth-check')
const sql = require('../database/user/user')
const querystring = require('querystring')
const request = require('request').defaults({ encoding: null })

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
    res.send(req.session.refreshToken)
})


// Retrieves Microsoft Graph user information
router.get('/microsoft/graph', authCheckMiddleware(), (req, res) => {
    getAccessToken(req, (err, token) => {
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
    getAccessToken(req, (err, token) => {
        request({
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'image/jpeg'
            },
            uri: 'https://graph.microsoft.com/v1.0/me/photos/240x240/$value',
            method: 'GET'
        }, (err, subRes, body) => {
            if (err) {
                res.status(500)
            } else {
                //console.log(body)
                const avatar = new Buffer(body, 'binary').toString('base64');
                res.send(avatar)
            }
        })
    })
})

// Get access token from Microsoft
function getAccessToken(req, callback) {
    const requestData = querystring.stringify({
        'client_id': `${process.env.MICROSOFT_GRAPH_CLIENT_ID}`,
        'refresh_token': `${req.session.refreshToken}`,
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
}


// Get user information
router.get('/user', authCheckMiddleware(), (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.session)
    }
})

router.get('/userdb', authCheckMiddleware(), (req, res) => {
    if (req.isAuthenticated()) {
        sql.getUser(req.session.passport.user.oid, result => {
            res.json(result)
        })
    }
})

router.get('/destroy', authCheckMiddleware(), (req, res) => {
    sql.destroyUser(req.session.passport.user.oid, () => {
        req.logOut()
        res.redirect('/')
    })
})


// Logout, check the user is actually logged in first though.
router.get('/logout', authCheckMiddleware(), function(req, res) {
    req.logOut()
    res.redirect('/')
})

module.exports = router
