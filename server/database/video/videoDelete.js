const sql = require('mssql')
const pool = require('../sql')
const storageDeleteBlob = require('../../storage/storageDeleteBlob')

// Delete video from the database and then delete the video file/thumbnail from
// Azure storage
function deleteVideo(videoId, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .query('DELETE FROM [dbo].[videos] WHERE videoId=@videoId')
            .then(res => {
                storageDeleteBlob(videoId)
                return callback(true)
            })
            .catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

module.exports = deleteVideo