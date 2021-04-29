const sql = require('mssql')
const pool = require('../sql')

function deleteComment(videoId, commentId, authorId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('commentId', sql.VarChar, commentId)
            .input('authorId', sql.VarChar, authorId)
            .query('SELECT * FROM [dbo].[comments] WHERE commentId=@commentId AND author=@authorId')
    }).then(() => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .input('commentId', sql.VarChar, commentId)
            .query('DELETE FROM [dbo].[comments] WHERE videoId=@videoId AND commentId=@commentId')
            .then(() => {
                return callback(0)
            })
            .catch(err => {
                return callback(err)
            })
    }).catch(err => {
        return callback(1)
    })
}

module.exports = deleteComment