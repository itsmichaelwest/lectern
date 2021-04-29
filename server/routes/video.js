const express = require('express')
const router = new express.Router()
const authCheckMiddleware = require('../middleware/auth-check')

// Database endpoints
const fetch = require('../database/video/fetch')
const upload = require('../database/video/upload')
const views = require('../database/video/setViews')
const search = require('../database/video/videoSearch')
const deleteVideo = require('../database/video/videoDelete')


// Get all videos. Could return a large number of objects.
router.get('/all', (req, res) => {
    fetch.getAll((result) => {
        res.json(result)
    })
})

// Get top 9 videos sorted by view count.
router.get('/top', (req, res) => {
    fetch.getTop9((result) => {
        res.json(result)
    })
})

// Get the 9 most recently uploaded videos.
router.get('/recent', (req, res) => {
    fetch.getRecently((result) => {
        res.json(result)
    })
})

// Retrieve videos based on a search query.
router.get('/search/:query', (req, res) => {
    search.searchTitleDescription(req.params.query, (result) => {
        if (result !== false) {
            res.json(result)
        } else {
            res.status(404).json("No videos with that search query could be found")
        }
    })
})

// Get an upload token for use with Azure Storage.
router.get('/upload/sas', authCheckMiddleware(), (req, res) => {
    if (req.isAuthenticated()) {
        const getSasToken = require('../storage/storageGetSasToken')
        res.json(getSasToken())
    } else {
        res.status(403)
    }
})

// Add video information to the database.
router.post('/upload', authCheckMiddleware(), async (req, res) => {
    if (req.isAuthenticated()) {
        upload(
            req.body.videoId,
            req.body.title, 
            req.body.description, 
            req.body.privacy,
            req.body.streamUrl,
            req.session.passport.user.oid,
            req.body.vidLength,
            req.body.thumbnail,
            result => {
                if (result) {
                    res.status(200).send('Video uploaded successfully!')
                }
            }
        )
    } else {
        res.status(401)
    }
})

// Add a view to a video.
router.post('/:videoId/view', (req, res) => {
    views.addView(req.params.videoId, () => {
        res.status(200)
    })
})

// Get information about a specific video.
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

// Delete a specific video, check if the requester is the uploader first.
router.delete('/:videoId', authCheckMiddleware(), (req, res) => {
    fetch.getVideo(req.params.videoId, video => {
        if (video !== false) {
            if (video.author === req.session.passport.user.oid) {
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
            res.status(404).send('No video with that ID could be found')
        }
    })
})

module.exports = router