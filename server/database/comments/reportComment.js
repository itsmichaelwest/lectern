const sql = require('mssql')
const pool = require('../sql')

function reportComment(commentId) {
    pool.connect().then((pool) => {
        pool.request()
            .input('commentId', sql.VarChar, commentId)
            .query('UPDATE [dbo].[comments] SET reported = 1 WHERE commentId=@commentId')
            .catch(err => {
                console.error(err)
            })
    })
}

function unreportComment(commentId) {
    pool.connect().then((pool) => {
        pool.request()
            .input('commentId', sql.VarChar, commentId)
            .query('UPDATE [dbo].[comments] SET reported = 0 WHERE commentId=@commentId')
            .catch(err => {
                console.error(err)
            })
    })
}

module.exports = {
    reportComment,
    unreportComment
}