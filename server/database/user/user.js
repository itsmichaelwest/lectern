const sql = require('mssql')
const pool = require('../sql')

function addUser(profile, displayName, userPhoto) {
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
                        .input('userPhoto', sql.VarBinary, new Buffer(userPhoto))
                        .query('INSERT INTO [dbo].[users] (userId, userName, userEmail, userPhoto) VALUES (@userId, @userName, @userEmail, @userPhoto)')
                        .catch(err => {
                            console.error(err)
                            throw err
                        })

                    pool.request()
                        .input('userId', sql.VarChar, profile.oid)
                        .input('userName', sql.VarChar, displayName)
                        .input('channelPhoto', sql.VarBinary, new Buffer(userPhoto))
                        .query('INSERT INTO [dbo].[channels] (channelId, displayName, channelPhoto) VALUES (@userId, @userName, @channelPhoto)')
                        .catch(err => {
                            console.error(err)
                            throw err
                        })
                }
                
            })
            .catch(err => {
                console.error(err)
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
                console.error(err)
                callback(err)
            })
    })
}

function destroyUser(oid, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('userId', sql.VarChar, oid)
            .query('DELETE FROM [dbo].[users] WHERE userId=@userId')
            .then(() => {
                pool.request()
                    .input('userId', sql.VarChar, oid)
                    .query('DELETE FROM [dbo].[channels] WHERE channelId=@userId')
                    .then(() => {
                        pool.request()
                            .input('userId', sql.VarChar, oid)
                            .query('DELETE FROM [dbo].[videos] WHERE author=@userId')
                            .then(() => {
                                pool.request()
                                    .input('userId', sql.VarChar, oid)
                                    .query('DELETE FROM [dbo].[comments] WHERE author=@userId')
                                    .then(() => {
                                        callback(false, true)
                                    })
                                    .catch(err => {
                                        console.error(err)
                                        callback(err)
                                    })
                            })
                            .catch(err => {
                                console.error(err)
                                callback(err)
                            })
                    })
                    .catch(err => {
                        console.error(err)
                        callback(err)
                    })
            })
            .catch(err => {
                console.error(err)
                callback(err)
            })
    })
}

module.exports = {
    addUser,
    getUser,
    destroyUser
}
