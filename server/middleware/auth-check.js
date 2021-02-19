var path = require('path')

function authCheckMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.send(401)
    }
  }
}

module.exports = authCheckMiddleware
