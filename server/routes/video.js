const express = require('express')
const router = new express.Router()
const https = require('https')
const videoApi = require('../api/video')
const fs = require('fs')

const vDatabase = require('../database/video/upload')

const authCheckMiddleware = require('../middleware/auth-check')

// Get all videos. Not recommended.
router.get('/allVideos', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.all())
})

router.get('/topVideos', (req, res) => {
    const top10 = require('../database/video/getTop10')
    res.json(top10())
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
    console.log(req.body.title)

    /*
    const storageUpload = require('../storage/uploadFile')
    const result = await storageUpload.prepareAssetAndBlockBlob(req.body.fileName)

    const databaseUpload = require('../database/video/upload')
    databaseUpload.insertVideo()*/

    //res.json(result)
})

router.post('/upload/:videoId/success', (req, res) => {
    //vDatabase.addStreamUrl(req.params.videoId, req.body.streamUrl)
    res.send(true)
})


router.post('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.like(req.params.videoId))
})

router.delete('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(videoApi.unlike(req.params.videoId))
})

module.exports = router