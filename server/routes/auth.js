const express = require('express')
const router = new express.Router()
const passport = require('passport')
const cors = require('cors')
const authCheckMiddleware = require('../middleware/auth-check')
const sql = require('../database/sql')
const querystring = require('querystring')
const request = require('request')

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


// Get user information
router.get('/user', cors(), authCheckMiddleware(), (req, res) => {
    var user = req.session.passport
    res.json(user)
})


// Retrieves an access token for use in Microsoft Graph API calls
router.get('/microsoft/token', cors(), authCheckMiddleware(), (req, res) => {
    sql.refresh(req.session.passport.user.oid, (err, data) => {
        const requestData = querystring.stringify({
            'client_id': `${process.env.MICROSOFT_GRAPH_CLIENT_ID}`,
            'refresh_token': `${data}`,
            'grant_type': 'refresh_token',
            'client_secret': `${process.env.MICROSOFT_GRAPH_CLIENT_SECRET}`
        })

        const requestLength = requestData.length

        request({
            headers: {
                'Content-Length': requestLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            body: requestData,
            method: 'POST'
        }, (err, subRes, body) => {
            if (err) {
                console.error(err)
                throw err
            } else {
                var data = JSON.parse(body);
                res.send(data.access_token)
            }
        })
    })
})


// Test call to check access token, get a profile picture from graph
router.get('/microsoft/avatar', cors(), authCheckMiddleware(), (req, res) => {
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


// Logout, check the user is actually logged in first though.
router.get('/logout', authCheckMiddleware(), function(req, res) {
    req.session.destroy(function(err) {
        req.logOut()
        res.redirect('/')
    })
})

module.exports = router


function getAccessToken(user, callback) {
    sql.refresh(user, (err, data) => {
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