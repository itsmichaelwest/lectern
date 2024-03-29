const sql = require('mssql')
const pool = require('../sql')

// Get all comments associated with a video
function getAllComments(videoId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .query('SELECT * FROM [dbo].[comments] AS comment INNER JOIN [dbo].[channels] AS channel ON comment.author=channel.channelId WHERE videoId=@videoId ORDER BY timestamp ASC')
            .then(res => {
                if (res.recordset.length > 0) {
                    return callback(res.recordset)
                } else {
                    return callback(false)
                }
            })
            .catch(err => {
                return callback(err)
            })
    })
}

// Get a single comment, if we know its ID
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
                return callback(err)
            })
    })
}

module.exports = {
    getAllComments,
    getSingleComment
}