require('dotenv').config();

const environment = {
    port: process.env.PORT || 8080,
    apiPath: process.env.API_PATH,
    jwtSecret: process.env.JWT_SECRET,
    mysql:{
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        port: process.env.MYSQL_PORT,
        password: process.env.MYSQL_PASSWORD,
        dbName: process.env.DB_NAME
    },
    mysqlServer:{
        host: process.env.MYSQL_SERVER_HOST,
        port: process.env.MYSQL_SERVER_PORT || 8080,
    }
}

module.exports = {environment};