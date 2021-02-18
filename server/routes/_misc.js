const express = require('express')
const router = new express.Router()
const https = require('https')
const cors = require('cors')
const authCheckMiddleware = require('../middleware/auth-check')

router.get('/profile', cors(), authCheckMiddleware(), (req, res) => {
    var user = req.session.passport
    //console.log(user)
    res.json(user)
})


// Funny request
router.get('/coffee', (req, res) => {
    res.sendStatus(418)
})

module.exports = router
