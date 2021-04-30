const sql = require('mssql')
const pool = require('../sql')

// Search videos by title and description
function searchTitleDescription(queryString, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('query', sql.VarChar, `%${queryString}%`)
            .query('SELECT * FROM [dbo].[videos] AS video INNER JOIN [dbo].[channels] AS channel ON video.author=channel.channelId WHERE title LIKE @query OR description LIKE @query')
            .then(res => {
                return callback(res.recordset)
            })
            .catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

module.exports = {
    searchTitleDescription
}