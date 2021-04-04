const sql = require('mssql')
const config = require('../sqlConfig')
const { v4: uuidv4 } = require('uuid')

function addComment(videoId, author, comment, callback) {
    const commentId = uuidv4()
    const timestamp = new Date().toISOString()

    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                INSERT INTO [dbo].[comments]
                (commentId, videoId, timestamp, author, comment, reported)
                VALUES
                ('${commentId}', '${videoId}', '${timestamp}', '${author}', '${comment}', 0)
                `,
                (err, res) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(true)
                    }
                }
            )
        }
    })
}

module.exports = addComment