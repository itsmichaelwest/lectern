const express = require('express')
const router = new express.Router()
const https = require('https')
const video = require('../api/video')

const authCheckMiddleware = require('../middleware/auth-check')

// Get all videos. Not recommended.
router.get('/allVideos', authCheckMiddleware(), (req, res) => {
    res.send(video.all())
})


// Get information about the video of [videoId]. 
router.get('/:videoId', authCheckMiddleware(), (req, res) => {
    res.send(video.get(req.params.videoId))
})


// Download video
router.get('/:videoId/download', authCheckMiddleware(), (req, res) => {
    res.send(video.download(req.params.videoId))
})

module.exports = router