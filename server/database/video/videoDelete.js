const sql = require('mssql')
const pool = require('../sql')

function deleteVideo(videoId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .query('DELETE FROM [dbo].[videos] WHERE videoId=@videoId')
            .then(res => {
                return callback(true)
            })
            .catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

module.exports = deleteVideo