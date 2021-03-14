const sql = require('mssql')
const config = require('../sqlConfig')

module.exports = function getTop10() {
    sql.connect(config, (err) => {
        if (err) {
            console.error(err)
            throw err
        } else {
            new sql.Request().query(
                `
                SELECT TOP (10) [id], [name], [description] FROM [dbo].[videos];
                `,
                (err, result) => {
                    if (err) {
                        console.error(err)
                        throw err
                    } else {
                        return result
                    }
                }
            )
        }
    })
}