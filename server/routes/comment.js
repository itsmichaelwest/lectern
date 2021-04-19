const express = require('express')
const router = new express.Router()
const authCheckMiddleware = require('../middleware/auth-check')

const { getAllComments } = require('../database/comments/fetchComment')
const addComment = require('../database/comments/addComment')
const deleteComment = require('../database/comments/deleteComment')
const { reportComment, unreportComment } = require('../database/comments/reportComment')

router.get('/:videoId', (req, res) => {
    getAllComments(req.params.videoId, (result) => {
        res.json(result)
    })
})

router.post('/:videoId', authCheckMiddleware(), (req, res) => {
    addComment(
        req.params.videoId,
        req.session.passport.user.oid,
        req.body.comment,
        req.body.timestamp,
        (result) => {
            if (result !== 0) {
                res.status(200).send('Comment inserted successfully.')
            } else {
                res.status(500).send('Unable to insert comment.')
            }
        }
    )
})

router.delete('/:videoId/:commentId', authCheckMiddleware(), (req, res) => {
    deleteComment(
        req.params.videoId,
        req.params.commentId,
        req.session.passport.user.oid,
        (result) => {
            if (result === 0) {
                res.status(200).send(`Comment ${req.params.commentId} successfully deleted.`)
            } else if (result === 1) {
                res.status(403).send('Unable to delete comment. User is not author and does not have permission.')
            } else {
                res.status(500).send('Unable to delete comment. Unknown server error.')
            }
        }
    )
})

router.post('/:videoId/:commentId/report', authCheckMiddleware(), (req, res) => {
    reportComment(req.params.commentId)
    res.status(200).send('Comment reported.')
})

router.delete('/:videoId/:commentId/report', authCheckMiddleware(), (req, res) => {
    unreportComment(req.params.commentId)
    res.status(200).send('Comment unreported.')
})

module.exports = router
