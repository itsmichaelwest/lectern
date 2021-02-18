const express = require('express')
const router = new express.Router()
const https = require('https')

const authCheckMiddleware = require('../middleware/auth-check')


// Get comments associated with [videoId]. 
router.get('/:videoId', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    res.json(req.params.videoId)
})


// Adds a comment to a video.
router.post('/:videoId', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    res.json(req.params.videoId)
})


// Deletes a comment to a video.
router.delete('/:videoId/:commentId', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    console.log(req.params.commentId)
    res.status(403)
})


// Adds a like to a comment.
router.post('/:videoId/:commentId/like', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    console.log(req.params.commentId)
    res.json("❤")
})


// Removes a like from a comment.
router.delete('/:videoId/:commentId/like', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    console.log(req.params.commentId)
    res.json("💔")
})

module.exports = router