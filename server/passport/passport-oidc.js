const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const user = require('../database/user/user')
const request = require('request')

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
        passReqToCallback: true,
        scope: [ 'email', 'profile', 'offline_access'],
        loggingLevel: 'info',
        nonceLifetime: null,
        nonceMaxAmount: 5,
        useCookieInsteadOfSession: true,
        cookieEncryptionKeys: [ 
            { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
            { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
        ],  
        clockSkew: null
    },
    function(req, iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.oid) {
          return done(new Error("No oid found"), null);
        }

        req.session.refreshToken = refreshToken

        request({
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            uri: 'https://graph.microsoft.com/v1.0/me',
            method: 'GET'
        }, (err, subRes, body) => {
            if (err) {
                console.error(err)
                throw err
            } else {
                let data = JSON.parse(body);
                req.session.userName = `${data.givenName} ${data.surname}`

                user.addUser(profile, refreshToken)
                
                return done(null, profile);
            }
        })
    }
)

module.exports = strategy
