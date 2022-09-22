const express = require('express');
const { environment } = require('../environment/environment.config');
const mysqlRouter = require('./network');

const app = express();
app.use(express.json());

app.use('/', mysqlRouter)

app.listen(environment.mysqlServer.port, ()=>{
    console.log(`server listening on http://localhost:${environment.mysqlServer.port}`);
})