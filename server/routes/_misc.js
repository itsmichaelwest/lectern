const express = require('express')
const router = new express.Router()
const https = require('https')
const cors = require('cors')
const authCheckMiddleware = require('../middleware/auth-check')

// Funny request
router.get('/coffee', (req, res) => {
    res.sendStatus(418)
})

module.exports = router
