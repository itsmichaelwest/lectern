const sql = require('mssql')
const pool = require('../sql')

function getAll(callback) {
    pool.connect().then((pool) => {
        pool.request()
            .query('SELECT * FROM [dbo].[videos] WHERE privacy=0')
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

function getTop9(callback) {
    pool.connect().then((pool) => {
        pool.request()
            .query('SELECT TOP (9) * FROM [dbo].[videos] WHERE privacy=0 ORDER BY views DESC')
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

function getRecently(callback) {
    pool.connect().then((pool) => {
        pool.request()
            .query('SELECT TOP (9) * FROM [dbo].[videos] WHERE privacy=0 ORDER BY uploaded DESC')
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

function getVideo(videoId, callback) {
    let response = []

    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .query('SELECT * FROM [dbo].[videos] WHERE videoId=@videoId')
            .then(res => {
                if (res.recordset.length > 0) {
                    response.push(res.recordset[0])

                    pool.request()
                        .input('channelId', sql.VarChar, res.recordset[0].author)
                        .query('SELECT * FROM [dbo].[channels] WHERE channelId=@channelId')
                        .then(res => {
                            if (res.recordset.length > 0) {
                                response.push(res.recordset[0])
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

function getChannelVideos(channelId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('channelId', sql.VarChar, channelId)
            .query('SELECT * FROM [dbo].[videos] WHERE privacy=0 AND author=@channelId')
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

module.exports = {
    getAll,
    getTop9,
    getRecently,
    getVideo,
    getChannelVideos
}