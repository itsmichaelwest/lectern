const express = require('express')
const router = new express.Router()
const authCheckMiddleware = require('../middleware/auth-check')

// Channel info API
const channelInfo = require('../database/channel/channelInfo')

// Video fetch API
const fetch = require('../database/video/fetch')

router.get('/:channelId', (req, res) => {
    channelInfo.getInfo(req.params.channelId, (result) => {
        if (result !== false) {
            res.json(result)
        } else {
            res.status(404).json("No channel with that ID could be found")
        }
    })
})

router.get('/:channelId/videos', (req, res) => {
    fetch.getChannelVideos(req.params.channelId, (result) => {
        res.json(result)
    })
})

router.get('/:channelId/all', (req, res) => {
    channelInfo.getInfoVideos(req.params.channelId, (result) => {
        if (result !== false) {
            res.json(result)
        } else {
            res.status(404).json("No channel with that ID could be found")
        }
    })
})

module.exports = router
