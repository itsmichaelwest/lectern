const express = require('express')
const router = new express.Router()
const passport = require('passport')
const cors = require('cors')
const authCheckMiddleware = require('../middleware/auth-check')

const config = require('../../src/config')


function refreshToken() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return req.user
        } else {
            next({
                status: 401,
                message: 'Error: User not logged in.'
            })
        }
    }
}

module.exports = {
    refreshToken
}