// const nanoid = require('nanoid');
const {errorGenerator} = require('../../../utilities/error.generator');
const bcrypt = require('bcrypt');
const db = require('../../../store/db.queries');
// const db = require('../../../store/remote-db');

//db test.


const TABLE = 'users';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    //In progress..
    async function create(user,loginDetails){
        try {
            delete user.login;
            user.login_id = loginDetails.insertId;
            const newUser = await db.insert(TABLE,user);
            //Id is added to the info the send to create a new user for the client to be able use it.
            user.id = newUser.insertId;
            delete user.login_id;
            return user;
        } catch (error) {
            await db.remove('auths',loginDetails.insertId);
            throw errorGenerator('serverError', 500,error);
        } 
    }

    //Ready for test.
   async function getAll() {
        try {
            // const users = await db.getAll(TABLE);
            const users = await db.getAll(TABLE)
            return users;
        } catch (error) {
            throw errorGenerator('serverError', 500, error.message);
        }

    }
    
    async function get(id){
        try {
            const user = await db.get(TABLE,id);
            console.log();
            if(user.length === 0) throw errorGenerator('Not found', 404,'user not found')
            return user;
        } catch (error) {
            throw error;
        }
    }

    async function filter(options){
        try {
            const users = await db.getWithOptions(TABLE, options);
            if(users.length === 0) throw errorGenerator('Not found', 404, 'Data not found');
            return users;
        } catch (error) {
            throw error;
        }
    }

    async function update(changes,id){
        try {
            const response = await db.update(TABLE,changes,id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    return {
        getAll,
        get, 
        create,
        update,
        filter
    };
}

