/* 
 * create a `.env` file with environment variables in order to laod at runtime.
*/
var config = {
  jwtSecret: process.env.APP_SESSION_SECRET || 'big Secret',
  cookieSettings: {
    maxAge: 360000
  },
  serverPort: process.env.PORT || 8080
}

module.exports = config
