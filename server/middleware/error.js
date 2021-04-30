// Return HTTP 500 in the event of encountering a server error.
function errorHandlingMiddleware () {
    return function (err, req, res, next) {
        res.status(err.status || 500)
        res.json({ status: err.status, message: err.message })
    }
}

module.exports = errorHandlingMiddleware
