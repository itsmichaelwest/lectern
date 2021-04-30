const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const user = require('../database/user/user')
const request = require('request').defaults({ encoding: null })

const url = process.env.AUTH_REDIRECT_URL || 'https://lectern.video'

// Set up Azure AD strategy
const strategy = new OIDCStrategy(
    {
        identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
        clientID: process.env.MICROSOFT_GRAPH_CLIENT_ID,
        responseType: 'code id_token',
        responseMode: 'form_post',
        redirectUrl: `${url}/auth/microsoft/callback`,
        allowHttpForRedirectUrl: true,
        clientSecret: process.env.MICROSOFT_GRAPH_CLIENT_SECRET,
        validateIssuer: false,
        issuer: null,
        passReqToCallback: true,
        scope: [ 'email', 'profile', 'offline_access', 'User.Read' ],
        loggingLevel: 'info',
        nonceLifetime: null,
        nonceMaxAmount: 5,
        useCookieInsteadOfSession: true,
        cookieEncryptionKeys: [ 
            { 'key': process.env.COOKIE_KEY_1 || '12345678901234567890123456789012', 'iv': process.env.COOKIE_IV_1 || '123456789012' },
            { 'key': process.env.COOKIE_KEY_2 ||  'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': process.env.COOKIE_IV_2 || 'abcdefghijkl' }
        ],  
        clockSkew: null
    },
    function(req, iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.oid) {
          return done(new Error("No oid found"), null);
        }

        req.session.refreshToken = refreshToken

        // Get user information from the Microsoft Graph
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

                // Get 240x240 user photo from Microsoft Graph
                request({
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    uri: 'https://graph.microsoft.com/v1.0/me/photos/240x240/$value',
                    method: 'GET'
                }, (err, subRes, body) => {
                    if (err) {
                        console.error(err)
                        throw err
                    } else {
                        const avatar = new Buffer.from(body, 'binary').toString('base64')
                        
                        user.addUser(profile, req.session.userName, avatar, () => {})

                        return done(null, profile)
                    }
                })
            }
        })
    }
)

module.exports = strategy
