const sql = require('mssql')
const pool = require('../sql')
const { v4: uuidv4 } = require('uuid')

function addComment(videoId, author, displayName, comment, callback) {
    const commentId = uuidv4()
    const timestamp = new Date().toISOString()

    pool.connect().then((pool) => {
        pool.request()
            .input('commentId', sql.VarChar, commentId)
            .input('videoId', sql.VarChar, videoId)
            .input('timestamp', sql.DateTime2, timestamp)
            .input('author', sql.VarChar, author)
            .input('authorDisplayName', sql.VarChar, displayName)
            .input('comment', sql.NVarChar, comment)
            .input('reported', sql.Bit, 0)
            .query('INSERT INTO [dbo].[comments] (commentId, videoId, timestamp, author, authorDisplayName, comment, reported) VALUES (@commentId, @videoId, @timestamp, @author, @authorDisplayName, @comment, @reported)')
    }).then(res => {
        console.log(res)
        return callback(true)
    }).catch(err => {
        console.error(err)
        return callback(err)
    })
}

module.exports = addComment