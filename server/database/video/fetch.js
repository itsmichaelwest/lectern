const sql = require('mssql')
const config = require('../sqlConfig')

function getAll(callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT [videoId], [title], [description] FROM [dbo].[videos];
                `,
                (err, result) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(result.recordset)
                    }
                }
            )
        }
    })
}

function getTop10(callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT TOP (10) [videoId], [title], [description] FROM [dbo].[videos];
                `,
                (err, result) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(result.recordset)
                    }
                }
            )
        }
    })
}

function getVideo(videoId, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT * FROM [dbo].[videos] WHERE videoId='${videoId}';
                `,
                (err, result) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(result.recordset[0])
                    }
                }
            )
        }
    })
}

function getChannelVideos(channelId, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT [videoId], [title], [description] FROM [dbo].[videos] WHERE author='${channelId}'
                `,
                (err, result) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(result.recordset)
                    }
                }
            )
        }
    })
}

module.exports = {
    getAll,
    getTop10,
    getVideo,
    getChannelVideos
}