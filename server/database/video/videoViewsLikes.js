const sql = require('mssql')
const config = require('../sqlConfig')

function addView(videoId) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[videos] SET views=views+1 WHERE videoID = '${videoId}'`)
        }
    })
}

function removeView(videoId) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[videos] SET views=views-1 WHERE videoID = '${videoId}'`)
        }
    })
}

module.exports = {
    addView,
    removeView
}