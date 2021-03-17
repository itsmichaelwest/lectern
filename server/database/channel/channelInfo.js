const sql = require('mssql')
const config = require('../sqlConfig')

function getInfo(channelId, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT * FROM [dbo].[channel] WHERE channelId='${channelId}';
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

module.exports = {
    getInfo
}