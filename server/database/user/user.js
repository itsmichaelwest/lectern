const sql = require('mssql')
const pool = require('../sql')

function addUser(profile, displayName) {
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
                        .query('INSERT INTO [dbo].[users] (userId, userName, userEmail) VALUES (@userId, @userName, @userEmail)')
                        .catch(err => {
                            console.error(err)
                            throw err
                        })

                    pool.request()
                        .input('userId', sql.VarChar, profile.oid)
                        .input('userName', sql.VarChar, displayName)
                        .query('INSERT INTO [dbo].[channels] (channelId, displayName) VALUES (@userId, @userName)')
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
            .query('SELECT * FROM FROM [dbo].[users] WHERE userId=@userId')
            .then(res => {
                callback(true, res.recordset[0])
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
