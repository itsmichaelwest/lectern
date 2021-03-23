const config = {
    user: `${process.env.AZ_DATABASE_USERNAME}`,
    password: `${process.env.AZ_DATABASE_PASSWORD}`,
    server: `${process.env.AZ_DATABASE_URL}`,
    database: `${process.env.AZ_DATABASE_DB}`,
}

module.exports = config