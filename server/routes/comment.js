const express = require('express')
const router = new express.Router()
const comment = require('../api/comment')
const authCheckMiddleware = require('../middleware/auth-check')
/*
Routes for comment API
 */

// Get comments associated with [videoId].
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#get-apiv1commentsvideoid
router.get('/:videoId', authCheckMiddleware(), (req, res) => {
    res.send(comment.get(req.params.videoId))
})


// Adds a comment to a video.
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#get-apiv1commentsvideoid
router.post('/:videoId', (req, res) => {
    console.log(req.body)
    res.send(comment.post(req.params.videoId, req.body))
})


// Deletes a comment to a video.
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#delete-apiv1commentsvideoidcommentid
router.delete('/:videoId/:commentId', authCheckMiddleware(), (req, res) => {
    console.log(req.params.videoId)
    console.log(req.params.commentId)
    res.status(403)
})


// Adds a like to a comment.
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#post-apiv1commentsvideoidcommentidlike
router.post('/:videoId/:commentId/like', (req, res) => {
    comment.like(req.params.videoId, req.params.commentId)
    res.json("❤")
})


// Removes a like from a comment.
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#delete-apiv1commentsvideoidcommentidlike
router.delete('/:videoId/:commentId/like', (req, res) => {
    comment.unlike(req.params.videoId, req.params.commentId)
    res.json("💔")
})


// Adds a report to a comment
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#post-apiv1commentsvideoidcommentidreport
router.post('/:videoId/:commentId/report', (req, res) => {
    comment.report(req.params.videoId, req.params.commentId)
    res.json("REPORTED")
})


// Removes report to a comment
// https://gitlab.dcs.aber.ac.uk/maw86/cs39440-project/wikis/02-api/comments#delete-apiv1commentsvideoidcommentidreport
router.delete('/:videoId/:commentId/report', (req, res) => {
    comment.unreport(req.params.videoId, req.params.commentId)
    res.json("UNREPORTED")
})

module.exports = router
