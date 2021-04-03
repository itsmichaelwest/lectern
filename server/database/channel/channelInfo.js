const sql = require('mssql')
const config = require('../sqlConfig')

function getInfo(channelId, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT * FROM [dbo].[channels] WHERE channelId='${channelId}';
                `,
                (err, result) => {
                    if (err) {
                        return callback(err)
                    } else {
                        if (result.recordset.length > 0) {
                            return callback(result.recordset[0])
                        } else {
                            return callback(false)
                        }
                    }
                }
            )
        }
    })
}

function getInfoVideos(channelId, callback) {
    let response = []

    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT * FROM [dbo].[channels] WHERE channelId='${channelId}';
                `,
                (err, result) => {
                    if (err) {
                        return callback(err)
                    } else {
                        if (result.recordset.length > 0) {
                            response.push(result.recordset[0])
                            new sql.Request().query(
                                `
                                SELECT [videoId], [title], [description] FROM [dbo].[videos] WHERE author='${channelId}'
                                `,
                                (err, result) => {
                                    if (err) {
                                        return callback(err)
                                    } else {
                                        response.push(result.recordset)
                                        return callback(response)
                                    }
                                }
                            )
                        } else {
                            return callback(false)
                        }
                    }
                }
            )
        }
    })
}

module.exports = {
    getInfo,
    getInfoVideos
}