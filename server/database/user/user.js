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
                        .input('reported', sql.Bit, 0)
                        .input('suspended', sql.Bit, 0)
                        .query('INSERT INTO [dbo].[channels] (channelId, displayName, channelPhoto, reported, suspended) VALUES (@userId, @userName, @channelPhoto, @reported, @suspended)')
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
                callback(false, true)
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
