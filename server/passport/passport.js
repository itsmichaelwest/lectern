const OIDCStrategy = require('./passport-oidc')

module.exports = function (passport) {
    passport.serializeUser((profile, done) => {
        done(null, profile)
    })

    passport.deserializeUser((profile, done) => {
        done(null, profile)
    })

    passport.use(OIDCStrategy)
}
