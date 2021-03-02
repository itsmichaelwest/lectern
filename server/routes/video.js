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
router.get('/download/:videoId', authCheckMiddleware(), (req, res) => {
    res.download(`./server/uploads/${req.params.videoId}`)
})


router.post('/upload', authCheckMiddleware(), (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            })
        } else {
            let video = req.files.video

            video.mv('./server/uploads/' + video.name)

            console.log(`NAME: ${video.name}`)
            console.log(`MIMETYPE: ${video.mimetype}`)
            console.log(`SIZE: ${video.size}`)

            res.send({
                status: true,
                message: 'File uploaded',
                data: {
                    name: video.name,
                    mimetype: video.mimetype,
                    size: video.size
                }
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
    //res.send(video.insert)
})


router.post('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(video.like(req.params.videoId))
})

router.delete('/:videoId/like', authCheckMiddleware(), (req, res) => {
    res.send(video.unlike(req.params.videoId))
})

module.exports = router