const express = require('express')
const router = new express.Router()
const https = require('https')
const cors = require('cors')

const authCheckMiddleware = require('../middleware/auth-check')

// ------------------------------------------------------------------
// api routes
// ------------------------------------------------------------------

router.get('/profile', cors(), authCheckMiddleware(), (req, res) => {
    var user = req.session.passport
    //console.log(user)
    res.json(user)
})

router.get('/profile/image', cors(), authCheckMiddleware(), (req, res) => {
    var user = req.session.passport

    https.request({
        hostname: 'graph.microsoft.com',
        path: '/v1.0/me/photo/$value',
        port: 443,
        method: 'GET',
        headers: {Authorization: 'Bearer' + user.accessToken, Accept: 'application/json'}
    },(rs) => {
        console.log('HTTPS Response Status: ', rs.statusCode)
        console.log('HTTPS Response Headers: ', rs.headers)
        rs.on('data', (d) => {
            res.send(d)
        })
    }).end()
})

module.exports = router
