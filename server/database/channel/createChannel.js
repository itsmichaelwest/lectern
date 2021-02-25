const sql = require('mssql')
const config = require('../sqlConfig')

module.exports = function createChannel(channelObject) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            var request = new sql.Request()

            request.query(`SELECT * FROM [dbo].[channel] WHERE channelId='${channelObject.id}';`, (err, result) => {
                if (err) {
                    console.error(err)
                    throw err
                } else {
                    console.log('not in database')

                    /*
                    // Check if user is in the database, query will be undefined if not present.
                    if (typeof result.recordset[0] === 'undefined') {
                        request.query(`INSERT INTO [dbo].[users] (userId, userName, userEmail) VALUES ('${profile.oid}', '${profile.displayName}', '${profile._json.email}')`, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        });
                    }
                    */
                }
            })
        }
    })
}