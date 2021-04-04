const sql = require('mssql')
const config = require('../sqlConfig')

function getAllComments(videoId, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT * FROM [dbo].[comments] WHERE videoId='${videoId}'
                `,
                (err, res) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(res.recordset)
                    }
                }
            )
        }
    })
}


function getSingleComment(videoId, commentId, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                SELECT * FROM [dbo].[comments] WHERE videoId='${videoId}' AND commentId='${commentId}'
                `,
                (err, res) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(res.recordset)
                    }
                }
            )
        }
    })
}


module.exports = {
    getAllComments,
    getSingleComment
}