const sql = require('mssql')
const pool = require('../sql')

// Add video to database
function insertVideo(videoId, name, description, privacy, streamUrl, author, length, thumbnail, callback) {
    // Return false (i.e. error) callback if video name or description are too long.
    if (name.length > 1000 || description.length > 2000) {
        return callback(false)
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
            .then(() => {
                return callback(true)
            })
            .catch(err => {
                throw err
            })
    })
}

module.exports = insertVideo