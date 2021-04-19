const express = require('express')
const router = new express.Router()
const authCheckMiddleware = require('../middleware/auth-check')
const fs = require('fs')

// Database endpoints
const fetch = require('../database/video/fetch')
const upload = require('../database/video/upload')
const views = require('../database/video/setViews')
const search = require('../database/video/videoSearch')
const deleteVideo = require('../database/video/videoDelete')


// Get all videos. Not recommended.
router.get('/all', (req, res) => {
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

router.get('/search/:query', (req, res) => {
    search.searchTitleDescription(req.params.query, (result) => {
        if (result !== false) {
            res.json(result)
        } else {
            res.status(404).json("No videos with that search query could be found")
        }
    })
})

router.get('/sas', authCheckMiddleware(), (req, res) => {
    if (req.isAuthenticated()) {
        const getSasToken = require('../storage/storageGetSasToken')
        res.json(getSasToken())
    } else {
        res.status(403)
    }
})

router.post('/upload', authCheckMiddleware(), async (req, res) => {
    if (req.isAuthenticated()) {
        upload.insertVideo(
            req.body.videoId,
            req.body.title, 
            req.body.description, 
            req.body.privacy,
            req.body.streamUrl,
            req.session.passport.user.oid,
            req.session.userName
        )
        res.status(200).send('Video uploaded successfully!')
    } else {
        res.status(401)
    }
})


router.post('/:videoId/view', (req, res) => {
    views.addView(req.params.videoId)
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
    fetch.getVideoBlobUrl(req.params.videoId, (result) => {
        if (result !== false) {
            res.status(501)
        } else {
            res.status(404).json("No video with that ID could be found")
        }
    })
})

// Get information about the video of [videoId]. 
router.delete('/:videoId', authCheckMiddleware(), (req, res) => {
    fetch.getVideo(req.params.videoId, video => {
        if (video !== false) {
            if (video[0].author === req.session.passport.user.oid) {
                deleteVideo(req.params.videoId, result => {
                    if (result === true) {
                        res.status(200).send('Video deleted successfully!')
                    } else {
                        res.status(500).send('Unknown error')
                    }
                })
            } else {
                res.status(403).send('Not allowed, you are not the uploader of this video.')
            }
        } else {
            res.status(404).send("No video with that ID could be found")
        }
    })
})

module.exports = router