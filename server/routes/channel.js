const express = require('express')
const router = new express.Router()

// Channel info API
const channelInfo = require('../database/channel/channelInfo')
const channelSearch = require('../database/channel/channelSearch')

// Video fetch API
const fetch = require('../database/video/fetch')

// Retrieve channels based on a search query.
router.get('/search/:query', (req, res) => {
    channelSearch(req.params.query, (result) => {
        if (result !== false) {
            res.json(result)
        } else {
            res.status(404).json("No channel with that ID could be found")
        }
    })
})

// Retrieve channel information.
router.get('/:channelId', (req, res) => {
    channelInfo.getInfo(req.params.channelId, (result) => {
        if (result !== false) {
            res.json(result)
        } else {
            res.status(404).json("No channel with that ID could be found")
        }
    })
})

// Retrieve channel videos.
router.get('/:channelId/videos', (req, res) => {
    fetch.getChannelVideos(req.params.channelId, (result) => {
        res.json(result)
    })
})

// Retrieve channel information and videos.
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
