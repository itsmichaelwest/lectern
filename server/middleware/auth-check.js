var path = require('path')

function authCheckMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).sendFile(path.join(__dirname + '/401.html'))
    }
  }
}

module.exports = authCheckMiddleware
