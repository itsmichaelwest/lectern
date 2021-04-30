const sql = require('mssql')

// Set up SQL connection
const config = {
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    server: `${process.env.DB_SERVER}`,
    database: `${process.env.DB_DATABASE}`,
    'options': {
        'encrypt': true,
        'enableArithAbort': true
    }
}

const pool = new sql.ConnectionPool(config)

module.exports = pool