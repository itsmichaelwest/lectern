const sql = require('mssql')
const config = require('../sqlConfig')


function getAllVideos() {
    sql.connect(config, function(err) {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`SELECT * FROM [dbo].[video];`, function(err, result) {
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


function getVideo(videoId) {
    /*
    sql.connect(config, function(err) {
        if (err) {
            console.log(err)
            throw err
        } else {
            new sql.Request().query(`INSERT INTO [dbo].[video] ';`, function(err, result) {
                if (err) {
                    console.error(err)
                    throw err
                } else {
                    config.log(result)
                    return result
                }
            })
        }
    })*/
}


module.exports = {
    getAllVideos,
    getVideo
}