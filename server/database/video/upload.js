const sql = require('mssql')
const config = require('../sqlConfig')
const { v4: uuidv4 } = require('uuid')

// Add video to database
function insertVideo(name, description, privacy, author) {
    if (name.length > 256) {
        console.error('[Server] Video title is too long!')
        return
    }

    if (description.length > 1024) {
        console.error('[Server] Video description is too long')
        return
    }

    const videoId = uuidv4()
    const uploaded = new Date().toISOString()

    console.log(uploaded)

    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(
                `
                INSERT INTO [dbo].[videos] 
                (videoId, title, description, privacy, author, uploaded, views)
                VALUES
                ('${videoId}', '${name}', '${description}', '${privacy}', '${author}', '${uploaded}', 0)
                `, 
                (err, result) => {
                if (err) {
                    console.error(err)
                    throw err
                } else {
                    console.log(result)
                    return result
                }
            })
        }
    })
}

// Updates video record with streaming url from azure, once it's been
// transcoded.
function addStreamUrl(id, url, callback) {
    sql.connect(config, (err) => {
        if (err) {
            return callback(err)
        } else {
            new sql.Request().query(
                `
                UPDATE [dbo].[video]
                SET url = '${url}'
                WHERE id = '${id}';
                `,
                (err, result) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(result)
                    }
                }
            )
        }
    })
}

module.exports = {
    insertVideo,
    addStreamUrl
}