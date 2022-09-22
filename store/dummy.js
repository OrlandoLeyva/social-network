const { errorGenerator } = require("../utilities/error.generator");

const db = {
    'users':  [
        {
            id: 1,
            name: 'orlando',
            lastName: 'leyva'
        },
        {
            id: 2,
            name: 'maria',
            lastName: 'perez'
        },
        {
            id: 3,
            name: 'juan',
            lastName: 'perez'
        },
        {
            id: 4,
            name: 'pancho',
            lastName: 'leyva'
        },
        {
            id: 5,
            name: 'vany',
            lastName: 'leyva'
        },
        {
            id: 6,
            name: 'jorge',
            lastName: 'leyva'
        },
    ],

    'auths':[]
}

const getAll = async (table)=>{
    return db[table];
}

const get = async (table, id) => {
    const result = db[table].find(item=> item.id == id);
    if(!result){
        throw errorGenerator('not found', 404, 'value not found')
    }

    return result;
}

const getLogin = (username)=>{
    const userAuth = db['auths'].find(auth=> auth.username == username);
    if(!userAuth) throw errorGenerator('Unauthorized', 401, 'incorrect password or username');

    return userAuth;
}

const add = async (table, body)=>{
    const result = db[table].push(body);
    return body;
}

module.exports = {getAll, get, add, getLogin};