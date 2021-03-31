const sql = require('mssql')
const config = require('../sqlConfig')

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

module.exports = {
    getTop10
}