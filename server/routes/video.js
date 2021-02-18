const express = require('express')
const router = new express.Router()
const https = require('https')

const authCheckMiddleware = require('../middleware/auth-check')


// Get all videos. Not recommended.
router.get('/allVideos', authCheckMiddleware(), (req, res) => {
    console.log("allVideos")
    res.json("allVideos")
})


// Get information about the video of [videoId]. 
router.get('/:videoId', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    res.json(req.params.videoId)
})


router.get('/:videoId/download', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    res.json("download")
})

module.exports = router