const sql = require('mssql')
const pool = require('../sql')
const { v4: uuidv4 } = require('uuid')

// Add video to database
function insertVideo(videoId, name, description, privacy, author, displayName) {
    if (name.length > 256) {
        console.error('[Server] Video title is too long!')
        return
    }

    if (description.length > 1024) {
        console.error('[Server] Video description is too long')
        return
    }

    //const videoId = uuidv4()
    const uploaded = new Date().toISOString()

    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('privacy', sql.Numeric, privacy)
            .input('author', sql.VarChar, author)
            .input('authorDisplayName', sql.VarChar, displayName)
            .input('uploaded', sql.DateTime2, uploaded)
            .query('INSERT INTO [dbo].[videos] (videoId, title, description, privacy, author, authorDisplayName, uploaded, views) VALUES (@videoId, @name, @description, @privacy, @author, @authorDisplayName, @uploaded, 0)')
            .then(res => {
                return res
            })
            .catch(err => {
                console.error(err)
                throw err
            })
    })
}

// Updates video record with streaming url from azure, once it's been
// transcoded.
function addStreamUrl(videoId, url, callback) {
    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .input('streamUrl', sql.VarChar, url)
            .query('UPDATE [dbo].[videos] SET streamUrl=@streamUrl WHERE videoId=@videoId')
            .then(res => {
                console.log(res)
                return callback(res)
            })
            .catch(err => {
                console.error(err)
                return callback(err)
            })
    })
}

module.exports = {
    insertVideo,
    addStreamUrl
}