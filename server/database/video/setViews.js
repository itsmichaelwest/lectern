const sql = require('mssql')
const pool = require('../sql')

function addView(videoId) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .query('UPDATE [dbo].[videos] SET views = views+1 WHERE videoId=@videoId')
            .catch(err => {
                console.error(err)
            })
    })
}

function removeView(videoId) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .query('UPDATE [dbo].[videos] SET views = views-1 WHERE videoId=@videoId')
            .catch(err => {
                console.error(err)
            })
    })
}

module.exports = {
    addView,
    removeView
}