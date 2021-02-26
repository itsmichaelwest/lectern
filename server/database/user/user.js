const sql = require('mssql')
const config = require('../sqlConfig')

function addUser(profile) {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            var request = new sql.Request()

            request.query(`SELECT * FROM [dbo].[users] WHERE userId='${profile.oid}';`, (err, result) => {
                if (err) {
                    console.error(err)
                    throw err
                } else {
                    // Check if user is in the database, query will be undefined if not present.
                    if (typeof result.recordset[0] === 'undefined') {
                        request.query(`INSERT INTO [dbo].[users] (userId, userName, userEmail) VALUES ('${profile.oid}', '${profile.displayName}', '${profile._json.email}')`, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        });
                    }
                }
            })
        }
    })
}


function getUser(oid, callback) {
    const pool = new sql.ConnectionPool(config);
    const request = new sql.Request(pool);

    try {
        pool.connect(function() {
            request.query(`SELECT * FROM [dbo].[users] WHERE userId='${oid}';`, function(err, res) {
                if (err) {
                    callback(err)
                } else {
                    callback(false, res.recordset[0])
                }
            })
        })
    } catch (error) {
        console.error(error)
        callback(error)
    }
}


function getUserRefreshToken(oid, callback) {
    const pool = new sql.ConnectionPool(config);
    const request = new sql.Request(pool);

    try {
        pool.connect(function() {
            request.query(`SELECT * FROM [dbo].[users] WHERE userId='${oid}';`, function(err, res) {
                if (err) {
                    callback(err)
                } else {
                    callback(false, res.recordset[0].refreshToken)
                }
            })
        })
    } catch (error) {
        console.error(error)
        callback(error)
    }
}


function destroyUser(oid, callback) {
    const pool = new sql.ConnectionPool(config)
    const request = new sql.Request(pool)

    try {
        pool.connect(() => {
            request.query(`DELETE FROM [dbo].[users] WHERE userId='${oid}'`, (err, res) => {
                if (err) {
                    callback(err)
                } else {
                    callback(false, true)
                }
            })
        })
    } catch(error) {
        console.error(error)
        callback(error)
    }
}


module.exports = {
    addUser,
    getUser,
    getUserRefreshToken,
    destroyUser
}
