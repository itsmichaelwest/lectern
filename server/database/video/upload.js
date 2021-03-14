const sql = require('mssql')
const config = require('../sqlConfig')

// Add video to database
function insertVideo(id, name, description, privacy) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(
                `
                INSERT INTO [dbo].[video] 
                (id, name, description, privacy)
                VALUES
                ('${id}', '${name}', '${description}', '${privacy}');
                `, 
                (err, result) => {
                if (err) {
                    console.error(err)
                    throw err
                } else {
                    config.log(result)
                    return result
                }
            })
        }
    })
}

// Updates video record with streaming url from azure, once it's been
// transcoded.
function addStreamUrl(id, url) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(
                `
                UPDATE [dbo].[video]
                SET url = '${url}'
                WHERE id = '${id}';
                `,
                (err, result) => {
                    if (err) {
                        console.log(err)
                        throw err
                    } else {
                        console.log(result)
                        return result
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