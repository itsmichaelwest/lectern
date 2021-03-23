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

function addLike(videoId) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[videos] SET likes=likes+1 WHERE videoID = '${videoId}'`)
        }
    })
}

function removeLike(videoId) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[videos] SET likes=likes-1 WHERE videoID = '${videoId}'`)
        }
    })
}

function addDislike(videoId) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[videos] SET dislikes=dislikes+1 WHERE videoID = '${videoId}'`)
        }
    })
}

function removeDislike(videoId) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`UPDATE [dbo].[videos] SET dislikes=dislikes-1 WHERE videoID = '${videoId}'`)
        }
    })
}

module.exports = {
    addView,
    removeView,
    addLike,
    removeLike,
    addDislike,
    removeDislike
}