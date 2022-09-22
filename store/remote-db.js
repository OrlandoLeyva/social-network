const { environment } = require('../environment/environment.config')
const createRemoteConnection = require('./remote-db.connection')
const dbUrl = `http://localhost:${environment.mysqlServer.port}`
const dbConnection = createRemoteConnection(dbUrl);

module.exports = dbConnection;