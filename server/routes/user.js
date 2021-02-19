const express = require('express')
const router = new express.Router()
const authCheckMiddleware = require('../middleware/auth-check')

// Get user information
router.get('/profile', authCheckMiddleware(), (req, res) => {
    var user = req.session.passport
    res.json(user)
})

module.exports = router