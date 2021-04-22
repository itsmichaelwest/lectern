const sql = require('mssql')
const pool = require('../sql')

// Add video to database
function insertVideo(videoId, name, description, privacy, streamUrl, author, length, thumbnail) {
    if (name.length > 256) {
        console.error('[Server] Video title is too long!')
        return
    }

    if (description.length > 1024) {
        console.error('[Server] Video description is too long')
        return
    }

    const uploaded = new Date().toISOString()

    pool.connect().then((pool) => {
        pool.request()
            .input('videoId', sql.VarChar, videoId)
            .input('name', sql.NVarChar, name)
            .input('description', sql.NVarChar, description)
            .input('privacy', sql.Numeric, privacy)
            .input('streamUrl', sql.VarChar, streamUrl)
            .input('author', sql.VarChar, author)
            .input('length', sql.Numeric, length)
            .input('thumbnail', sql.VarChar, thumbnail)
            .input('uploaded', sql.DateTime2, uploaded)
            .query('INSERT INTO [dbo].[videos] (videoId, title, description, privacy, streamUrl, author, uploaded, views, length, thumbnail) VALUES (@videoId, @name, @description, @privacy, @streamUrl, @author, @uploaded, 0, @length, @thumbnail)')
            .then(res => {
                return res
            })
            .catch(err => {
                console.error(err)
                throw err
            })
    })
}

module.exports = insertVideo