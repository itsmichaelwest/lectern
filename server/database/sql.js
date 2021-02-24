var sql = require('mssql')

const config = {
    user: `${process.env.AZ_DATABASE_USERNAME}`,
    password: `${process.env.AZ_DATABASE_PASSWORD}`,
    server: `${process.env.AZ_DATABASE_URL}`, // You can use 'localhost\\instance' to connect to named instance
    database: `${process.env.AZ_DATABASE_DB}`,
}

function addUser(profile, refreshToken) {
    console.log(`PROFILE: ${profile}`)
    console.log(`EMAIL: ${profile._raw.email}`)

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
                    // User is not in database
                    if (result.recordset[0].userId !== profile.oid) {
                        console.log('User is not in, adding...')
                        request.query(`INSERT INTO [dbo].[users] (userId, refreshToken, userName, userEmail) VALUES ('${profile.oid}', '${refreshToken}', '${profile.displayName}', 'test@test.com')`, function(err) {
                            if (err) {
                                console.log(err)
                            }
                        });
                    } else {
                        console.log('User is in database')
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