const sql = require('mssql')
const pool = require('../sql')

function searchChannels(queryString, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('query', sql.VarChar, `%${queryString}%`)
            .query('SELECT * FROM [dbo].[channels] WHERE displayName LIKE @query')
            .then(res => {
                return callback(res.recordset)
            })
            .catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

module.exports = searchChannels