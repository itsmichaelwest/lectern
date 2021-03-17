const express = require('express')
const router = new express.Router()
const videoApi = require('../api/video')
const authCheckMiddleware = require('../middleware/auth-check')

// Database endpoints
const fetch = require('../database/video/fetch')
const upload = require('../database/video/upload')
const { request } = require('express')


// Get all videos. Not recommended.
router.get('/allVideos', authCheckMiddleware(), (req, res) => {
    fetch.getAll((result) => {
        res.json(result)
    })
})

// Get top 10 videos
router.get('/topVideos', (req, res) => {
    fetch.getTop10((result) => {
        res.json(result)
    })
})

// Get information about the video of [videoId]. 
router.get('/:videoId', (req, res) => {
    fetch.getVideo(req.params.videoId, (result) => {
        res.json(result)
    }) 
})

// Download video
router.get('/download/:videoId', authCheckMiddleware(), (req, res) => {
    res.download(`./server/uploads/${req.params.videoId}`)
})


router.post('/upload', authCheckMiddleware(), (req, res) => {
    console.log(req.body)

    /*
    const storageUpload = require('../storage/uploadFile')
    const result = await storageUpload.prepareAssetAndBlockBlob(req.body.fileName)*/

    if (req.isAuthenticated()) {
        upload.insertVideo(req.body.videoId, req.body.title, req.body.description, req.body.privacy, req.session.passport.user.oid)
    }

    //res.json(result)
})

// Add streaming URL to the video database entry
router.post('/upload/:videoId/success', (req, res) => {
    upload.addStreamUrl(req.params.videoId, req.body.streamUrl, (result) => {
        res.json(result)
    })
})

router.post('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.like(req.params.videoId))
})

router.delete('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.unlike(req.params.videoId))
})

module.exports = router