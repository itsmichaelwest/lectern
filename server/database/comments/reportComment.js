const sql = require('mssql')
const pool = require('../sql')

// Flip the reported flag on a comment
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

// Revert the reported flag on a comment
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