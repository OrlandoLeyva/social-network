const express = require('express');
const db = require('../store/db.queries');
const response = require('../network/response')

const mysqlRouter = express.Router();

mysqlRouter.get('/:table',getAll)


mysqlRouter.get('/:table/:id',
    get
)

 mysqlRouter.post('/:table', insert)

 mysqlRouter.patch('/:table:id', update)

//  mysqlRouter.delete('/:table',
 
//  )


//Middlewares.
async function getAll(req,res,next){
    const data = await db.getAll(req.params.table);
    res.status(200).json(response.success(null, 200, 'successful request', data));
}

async function get(req, res, next) {
    const data = await db.get(res.params.table, req.params.id)
    res.status(200).json(response.success(null, 200, 'successful request', data));
}

async function insert(req, res, next) {
    const data = await db.insert(req.params.table, req.body)
    res.status(201).json(response.success(null, 200, 'successful request', data));

}

async function update(req, res, next) {
    const data = await db.update(req.params.table, req.body, req.params.id)
    res.status(200).json(response.success(null, 200, 'successful request', data));
}

module.exports = mysqlRouter;