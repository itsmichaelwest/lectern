const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const cookieParser = require('cookie-parser')

const express = require('express')
const router = new express.Router()

const https = require('https')

const { Pool, Client } = require('pg')

const client = new Client({
    user: process.env.POSTGRES_SQL_USERNAME,
    host: 'localhost',
    database: 'cs394-test',
    password: process.env.POSTGRES_SQL_PASSWORD,
    port: 5433,
})

var url

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    url = `http://localhost:${process.env.PORT}`
} else {
    url = 'https://au-cs39440-dumb-test.azurewebsites.net'
}


var users = []


var findByOid = function(oid, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i]
        console.log('we are using user: ', user)
        if (user.oid === oid) {
            return fn(null, user)
        }
    }
    return fn(null, null);
}


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
        passReqToCallback: false,
        scope: ['email', 'offline_access', 'openid', 'profile', 'User.Read'],
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
            findByOid(profile.oid, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // "Auto-registration"
                    users.push(profile);

                    // Get the profile photo?
                    /*
                    let profilePhoto
                    https.request({
                        hostname: 'graph.microsoft.com',
                        path: '/v1.0/me/photo/$value',
                        port: 443,
                        method: 'GET',
                        headers: {Authorization: 'Bearer' + accessToken, Accept: 'application/json'}
                    },(rs) => {
                        console.log('HTTPS Response Status: ', rs.statusCode)
                        console.log('HTTPS Response Headers: ', rs.headers)
                        rs.on('data', (d) => {
                            profilePhoto = d
                        })
                    }).end()*/

                    /*
                    client.connect()

                    client.query('SELECT NOW()', (err, res) => {
                        console.log(err, res)
                        client.end()
                    })*/
                    
                    //console.log(`ISS: ${iss}`)
                    //console.log(`SUB: ${sub}`)
                    //console.log(`ACCESSTOKEN: ${accessToken}`)
                    //console.log(`REFRESHTOKEN: ${refreshToken}`)
                    return done(null, profile);
                }
                return done(null, user);
            });
        });
    }
)


function addUserToDatabase() {
    const request = new Request(
        
    )
}

module.exports = strategy