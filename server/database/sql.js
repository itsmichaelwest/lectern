const { Connection } = require('tedious')

const config = {
    authentication: {
        options: {
            userName: process.env.MS_SQL_USERNAME,
            password: process.env.MS_SQL_PASSWORD
        },
        type: 'default'
    },
    server: 'au-cs39440-test-database-srv1.database.windows.net',
    options: {
        database: 'au-cs39440-test-database',
        encrypt: true
    }
}

const connection = new Connection(config)

connection.on('connect', err => {
    if (err) {
        console.error(err.message)
    }
})

module.exports = connection

/*
function queryDatabase() {
    console.log('Reading rows from table')

    // Read all rows from table
    const request = new Request(
        `SELECT TOP 20 pc.Name as CategoryName,
                    p.name as ProductName
        FROM [SalesLT].[ProductCategory] pc
        JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.on("row", columns => {
        columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}
*/