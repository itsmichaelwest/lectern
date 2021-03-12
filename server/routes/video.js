const express = require('express')
const router = new express.Router()
const https = require('https')
const videoApi = require('../api/video')
const fs = require('fs')

const authCheckMiddleware = require('../middleware/auth-check')

// Get all videos. Not recommended.
router.get('/allVideos', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.all())
})


// Get information about the video of [videoId]. 
router.get('/:videoId', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.get(req.params.videoId))
})


// Download video
router.get('/download/:videoId', authCheckMiddleware(), (req, res) => {
    res.download(`./server/uploads/${req.params.videoId}`)
})


router.post('/upload', authCheckMiddleware(), async (req, res) => {
    const upload = require('../storage/uploadFile')
    const result = await upload.prepareAssetAndBlockBlob(req.body.fileName)
    res.json(result)
})


router.post('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.like(req.params.videoId))
})

router.delete('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.unlike(req.params.videoId))
})

module.exports = router