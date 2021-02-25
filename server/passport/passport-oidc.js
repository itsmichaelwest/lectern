const OIDCStrategy = require('passport-azure-ad').OIDCStrategy

let url

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    url = `http://localhost:${process.env.PORT}`
} else {
    url = 'https://az-mmp.michaelwe.st'
}

const SQL = require('../database/sql')

const strategy = new OIDCStrategy(
    {
        identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
        clientID: process.env.MICROSOFT_GRAPH_CLIENT_ID,
        responseType: 'code id_token',
        responseMode: 'form_post',
        redirectUrl: `http://localhost:8081/auth/microsoft/callback`,
        allowHttpForRedirectUrl: true,
        clientSecret: process.env.MICROSOFT_GRAPH_CLIENT_SECRET,
        validateIssuer: false,
        issuer: null,
        passReqToCallback: false,
        scope: ['openid', 'offline_access', 'email', 'profile', 'User.Read'],
        loggingLevel: 'info',
        nonceLifetime: null,
        nonceMaxAmount: 5,
        useCookieInsteadOfSession: true,
        cookieEncryptionKeys: [ 
            { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
            { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
        ],  
        clockSkew: null,
    },
    function(iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.oid) {
          return done(new Error("No oid found"), null);
        }
        // asynchronous verification, for effect...
        process.nextTick(function () {
            SQL.add(profile, refreshToken)
            return done(null, profile);
        });
    }
)

module.exports = strategy