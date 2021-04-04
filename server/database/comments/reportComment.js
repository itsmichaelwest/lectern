const sql = require('mssql')
const config = require('../sqlConfig')

function reportComment(commentId) {
    sql.connect(config, (err) => {
        if (err) {
            console.error(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[comments] SET reported = 1 WHERE commentId='${commentId}'`)
        }
    })
}

function unreportComment(commentId) {
    sql.connect(config, (err) => {
        if (err) {
            console.error(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[comments] SET reported = 0 WHERE commentId='${commentId}'`)
        }
    })
}

module.exports = {
    reportComment,
    unreportComment
}