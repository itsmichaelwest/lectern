const OIDCStrategy = require('./passport-oidc')
const refresh = require('passport-oauth2-refresh')

module.exports = function (passport) {
    passport.serializeUser((profile, done) => {
        done(null, profile)
    })

    passport.deserializeUser((profile, done) => {
        done(null, profile)
    })

    passport.use(OIDCStrategy)
    //refresh.use(OIDCStrategy)
}
