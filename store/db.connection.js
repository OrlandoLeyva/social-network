const mysql = require('mysql2');
const { environment } = require('../environment/environment.config');

const connectionConfig = {
    host: environment.mysql.host,
    user: environment.mysql.user,
    password: environment.mysql.password,
    database: environment.mysql.dbName
}

console.log(connectionConfig);

// const connection = mysql.createConnection(connectionConfig)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$0208myRDNMS$',
    database: 'social_network'
})

connection.connect((error)=>{
    if(error){
        console.log('connection error',error);
    } else console.log('bd connected');
})

connection.on('error',(error)=>{
    console.log('[connection error]', error);
});

module.exports = connection;