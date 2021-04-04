const sql = require('mssql')
const pool = require('../sql')

function getAllComments(videoId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .query('SELECT * FROM [dbo].[comments] WHERE videoId=@videoId')
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

function getSingleComment(videoId, commentId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .input('commentId', sql.VarChar, commentId)
            .query('SELECT * FROM [dbo].[comments] WHERE videoId=@videoId AND commentId=@commentId')
            .then(res => {
                console.log(res)
                //console.log('RecordSet Length: ' + res.recordset.length)
                if (res.recordset.length > 0) {
                    return callback(res.recordset)
                } else {
                    return callback(false)
                }
            }).catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

module.exports = {
    getAllComments,
    getSingleComment
}