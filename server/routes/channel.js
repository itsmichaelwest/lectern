const express = require('express')
const router = new express.Router()
const channel = require('../api/channel')
const authCheckMiddleware = require('../middleware/auth-check')
/*
Routes for channel API
 */

// Get comments associated with [videoId].
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#get-apiv1commentsvideoid
router.post('/:channelId', authCheckMiddleware(), (req, res) => {
    res.send(channel.updateChannel(null))
})