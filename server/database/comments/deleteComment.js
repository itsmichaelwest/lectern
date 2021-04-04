const sql = require('mssql')
const config = require('../sqlConfig')

function deleteComment(videoId, commentId, authorId, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(2)
        } else {
            new sql.Request().query(
                `
                SELECT * FROM [dbo].[comments] WHERE commentId='${commentId}' AND author='${authorId}'
                `,
                (err, res) => {
                    if (err) {
                        return callback(err)
                    } else {
                        if (res.recordset.length > 0) {
                            new sql.Request().query(
                                `
                                DELETE FROM [dbo].[comments] WHERE videoId='${videoId}' AND commentId='${commentId}'
                                `,
                                (err, res) => {
                                    if (err) {
                                        return callback(err)
                                    } else {
                                        return callback(0)
                                    }
                                }
                            )
                        } else {
                            return callback(1)
                        }
                    
                    }
                }
            )
        }
    })
}

module.exports = deleteComment