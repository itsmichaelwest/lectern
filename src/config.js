let config

// set API url to localhost when in development environment
if (process.env.NODE_ENV !== 'production') {
    config = {
        apiUrl: 'http://localhost:8081',
    }
} else {
    config = {
        apiUrl: 'https://lectern.video',
    }
}

module.exports = config
