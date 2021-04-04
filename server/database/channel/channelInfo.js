const sql = require('mssql')
const pool = require('../sql')

function getInfo(channelId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('channelId', sql.VarChar, channelId)
            .query('SELECT * FROM [dbo].[channels] WHERE channelId=@channelId')
            .then(res => {
                if (res.recordset.length > 0) {
                    return callback(res.recordset)
                } else {
                    return callback(false)
                }
            })
            .catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

function getInfoVideos(channelId, callback) {
    let response = []

    pool.connect().then((pool) => {
        pool.request()
            .input('channelId', sql.VarChar, channelId)
            .query('SELECT * FROM [dbo].[channels] WHERE channelId=@channelId')
            .then(res => {
                if (res.recordset.length > 0) {
                    response.push(res.recordset[0])

                    pool.request()
                        .input('channelId', sql.VarChar, channelId)
                        .query('SELECT [videoId], [title], [description] FROM [dbo].[videos] WHERE author=@channelId')
                        .then((res) => {
                            if (res.recordset.length > 0) { 
                                response.push(res.recordset)
                                return callback(response)
                            } else {
                                return callback(false)
                            }
                        })
                        .catch(err => {
                            console.error(err)
                            return callback(err)
                        })
                } else {
                    return callback(false)
                }
            })
            .catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

module.exports = {
    getInfo,
    getInfoVideos
}