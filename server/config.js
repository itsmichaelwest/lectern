// TODO: Move to .env file
var config = {
  jwtSecret: process.env.APP_SESSION_SECRET || 'big Secret',
  cookieSettings: {
    maxAge: 360000
  },
  serverPort: process.env.PORT || 8081
}

module.exports = config
