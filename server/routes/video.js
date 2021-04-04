const express = require('express')
const router = new express.Router()
const authCheckMiddleware = require('../middleware/auth-check')

// Database endpoints
const fetch = require('../database/video/fetch')
const upload = require('../database/video/upload')
const views = require('../database/video/setViews')


// Get all videos. Not recommended.
router.get('/all', authCheckMiddleware(), (req, res) => {
    fetch.getAll((result) => {
        res.json(result)
    })
})

// Get top 9 videos sorted by view count
router.get('/top', (req, res) => {
    fetch.getTop9((result) => {
        res.json(result)
    })
})

// Get top 9 most recently uploaded videos
router.get('/recent', (req, res) => {
    fetch.getRecently((result) => {
        res.json(result)
    })
})

// Get information about the video of [videoId]. 
router.get('/:videoId', (req, res) => {
    fetch.getVideo(req.params.videoId, (result) => {
        if (result !== false) {
            res.json(result)
        } else {
            res.status(404).json("No video with that ID could be found")
        }
    }) 
})

// Download video
router.get('/:videoId/download', authCheckMiddleware(), (req, res) => {
    res.download("test")
})


router.post('/upload', authCheckMiddleware(), (req, res) => {
    /*
    const storageUpload = require('../storage/uploadFile')
    const result = await storageUpload.prepareAssetAndBlockBlob(req.body.fileName)*/

    if (req.isAuthenticated()) {
        upload.insertVideo(
            req.body.title, 
            req.body.description, 
            req.body.privacy, 
            req.session.passport.user.oid,
            req.session.userName
        )
    }

    //res.json(result)
})

// Add streaming URL to the video database entry
router.post('/upload/:videoId/success', (req, res) => {
    upload.addStreamUrl(req.params.videoId, req.body.streamUrl, (result) => {
        res.json(result)
    })
})

router.post('/:videoId/view', (req, res) => {
    views.addView(req.params.videoId)
})

module.exports = router