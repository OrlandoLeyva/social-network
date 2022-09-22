const { environment } = require('../environment/environment.config')
const createRemoteConnection = require('./remote-db.connection')
const dbUrl = `http://${environment.mysqlServer.host}:${environment.mysqlServer.port}`
const dbConnection = createRemoteConnection(dbUrl);

module.exports = dbConnection;