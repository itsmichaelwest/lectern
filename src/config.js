let config

const version = '0.0.17'
const branch = 'develop'

// set API url to localhost when in development environment
if (process.env.NODE_ENV !== 'production') {
    config = {
        apiUrl: 'http://localhost:8081',
        version: version,
        branch: branch
    }
} else {
    config = {
        apiUrl: 'https://az-mmp.michaelwe.st',
        version: version,
        branch: branch
    }
}


module.exports = config
  