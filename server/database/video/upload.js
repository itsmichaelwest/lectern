const sql = require('mssql')
const config = require('../sqlConfig')

function uploadVideo() {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(
                `
                INSERT INTO [dbo].[video] 
                (id, url, audio, privacy, language, uploader, rating, description)
                VALUES
                ('');
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


module.exports = {
    uploadVideo
}