const dbConnection = require('./db.connection');



function sendQuery(query,data) {
    return new Promise((resolve,reject)=>{
        dbConnection.query(query,data,(error,result)=>{
            if(error) reject(error);
            resolve(result);

        } )
    })
}

async function insert(table,data){
    // return new Promise((resolve,reject)=>{
    //     dbConnection.query(`insert into ${table} set ?`, data, (error,data)=>{
    //         if(error) reject(new Error(error.message));
    //         resolve(data);
    //     })
    // })

    const query = `insert into ${table} set ?`;
   try {
        const response = await sendQuery(query,data);
        return response;
   } catch (error) {
        throw error;
   }
    
}

async function getAll(table){
    const query = `select * from ${table}`;
    try {
        const response = await sendQuery(query);
        return response;
    } catch (error) {
        throw error;
    }
}

async function get(table,id){
    return new Promise((resolve,reject)=>{
        dbConnection.query(`select * from ${table} where id=${id}`,(error,data)=>{
            if(error) reject(new Error(error.message));
            resolve(data);
        })
    })
}

async function getWithOptions(table,options){
    const query = `select * from ${table} ${options}`
    
    try {
        const response = await sendQuery(query);
        return response;
    } catch (error) {
        throw error;
    }
}

function update(table,data,id){
    return new Promise((resolve,reject)=>{
        dbConnection.query(`update ${table} set ? where id=${id}`,data,(error,data)=>{
            if(error) reject(new Error(error.message));
            return data;
        })
    })
}

async function remove(table,id){
    const query =  `delete from ${table} where id=${id}`;
    try {
        const response = await sendQuery(query,null);
    } catch (error) {
        throw error;
    }
}

module.exports = {insert,getAll,get,getWithOptions,update,remove};