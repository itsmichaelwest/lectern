var sql = require('mssql')

const config = {
    user: `${process.env.AZ_DATABASE_USERNAME}`,
    password: `${process.env.AZ_DATABASE_PASSWORD}`,
    server: `${process.env.AZ_DATABASE_URL}`,
    database: `${process.env.AZ_DATABASE_DB}`,
}

function addUser(profile, refreshToken) {
    sql.connect(config, function(err) {
        if (err) {
            console.log(err)
            throw err
        } else {
            var request = new sql.Request()

            request.query(`SELECT * FROM [dbo].[users] WHERE userId='${profile.oid}';`, function(err, result) {
                if (err) {
                    console.error(err)
                    throw err
                } else {
                    // Check if user is in the database, query will be undefined if not present.
                    if (typeof result.recordset[0] === 'undefined') {
                        request.query(`INSERT INTO [dbo].[users] (userId, refreshToken, userName, userEmail) VALUES ('${profile.oid}', '${refreshToken}', '${profile.displayName}', '${profile._json.email}')`, function(err) {
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

module.exports.add = addUser
module.exports.get = getUser
module.exports.refresh = getUserRefreshToken