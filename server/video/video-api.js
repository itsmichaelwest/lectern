const express = require('express')
const router = new express.Router()
const https = require('https')

const authCheckMiddleware = require('../middleware/auth-check')

const transcode = require('./transcode')

router.get('/get/:id', authCheckMiddleware(), (req, res) => {
    console.log(req.params.id)
    res.json(req.params.id)
    transcode.transcodeMP4()
})

router.post('/post', authCheckMiddleware(), (req, res) => {
    console.log('post url')
})

module.exports = router