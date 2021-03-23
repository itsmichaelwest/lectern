const express = require('express')
const router = new express.Router()
const authCheckMiddleware = require('../middleware/auth-check')

// Channel info API
const channelInfo = require('../database/channel/channelInfo')

// Video fetch API
const fetch = require('../database/video/fetch')

router.get('/:channelId', (req, res) => {
    console.log('[Server] Channel info requested')
    channelInfo.getInfo(req.params.channelId, (result) => {
        res.json(result)
    })
})

router.get('/:channelId/videos', (req, res) => {
    console.log('[Server] Channel videos requested')
    fetch.getChannelVideos(req.params.channelId, (result) => {
        res.json(result)
    })
})

module.exports = router
