const sql = require('mssql')
const storageDeleteBlob = require('../../storage/storageDeleteBlob')
const pool = require('../sql')

function addUser(profile, displayName, avatar, callback) {
    let uploadedUserPhoto

    if (avatar !== null) {
        const avatarResponse = Buffer.from(avatar, 'base64').toString('utf-8')

        try{ 
            if (!JSON.parse(avatarResponse).error) {
                uploadedUserPhoto = new Buffer.from(avatar)
            } else {
                uploadedUserPhoto = null
            }
        } catch {
            uploadedUserPhoto = new Buffer.from(avatar)
        }
    } else {
        uploadedUserPhoto = null
    }

    pool.connect().then((pool) => {
        pool.request()
            .input('userId', sql.VarChar, profile.oid)
            .query('SELECT * FROM [dbo].[users] WHERE userId=@userId')
            .then(res => {
                if (typeof res.recordset[0] === 'undefined') {
                    pool.request()
                        .input('userId', sql.VarChar, profile.oid)
                        .input('userName', sql.VarChar, displayName)
                        .input('userEmail', sql.VarChar, profile._json.email)
                        .input('userPhoto', sql.VarBinary, uploadedUserPhoto)
                        .query('INSERT INTO [dbo].[users] (userId, userName, userEmail, userPhoto) VALUES (@userId, @userName, @userEmail, @userPhoto)')
                        .then(() => {
                            pool.request()
                            .input('userId', sql.VarChar, profile.oid)
                            .input('userName', sql.VarChar, displayName)
                            .input('channelPhoto', sql.VarBinary, uploadedUserPhoto)
                            .input('reported', sql.Bit, 0)
                            .input('suspended', sql.Bit, 0)
                            .query('INSERT INTO [dbo].[channels] (channelId, displayName, channelPhoto, reported, suspended) VALUES (@userId, @userName, @channelPhoto, @reported, @suspended)')
                            .then(() => {
                                return callback(true)
                            })
                            .catch(err => {
                                console.error(err)
                                throw err
                            })
                        })
                        .catch(err => {
                            console.error(err)
                            throw err
                        })
                }
                
            })
            .catch(err => {
                throw err
            })
    })
}

function getUser(oid, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('userId', sql.VarChar, oid)
            .query('SELECT *  FROM [dbo].[users] WHERE userId=@userId')
            .then(res => {
                callback(res.recordset[0])
            })
            .catch(err => {
                callback(err)
            })
    })
}

function destroyUser(oid, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('author', sql.VarChar, oid)
            .query('SELECT * FROM [dbo].[videos] WHERE author=@author')
            .then(res => {
                if (res.recordset.length > 0) {
                    res.recordset.forEach(video => {
                        storageDeleteBlob(video.videoId)
                    })
                }
                pool.request()
                    .input('userId', sql.VarChar, oid)
                    .query('DELETE FROM [dbo].[users] WHERE userId=@userId')
                    .then(() => {
                        // We have to delete comments separately because of some...errors
                        pool.request()
                            .input('userId', sql.VarChar, oid)
                            .query('DELETE FROM [dbo].[comments] WHERE author=@userId')
                            .then(() => {
                                return callback(true)
                            })
                            .catch(err => {
                                throw err
                            })
                    })
                    .catch(err => {
                        throw err
                    })
            })
    })
}

module.exports = {
    addUser,
    getUser,
    destroyUser
}
