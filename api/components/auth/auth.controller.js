const {sign} = require('../../../auth/index');
const bcrypt = require('bcrypt');
const { errorGenerator } = require('../../../utilities/error.generator');
const db = require('../../../store/db.queries');
const authController = require('./index.auth');
const auth = require('../../../auth')

const TABLE = 'auths';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function create(login){
        try {
            login.password = await auth.hashPassword(login.password);
            const userLogin = await db.insert(TABLE, login);
            return userLogin;
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY') throw errorGenerator('Bad request', 400, 'There is already an account with this email')

            throw errorGenerator('serverError', 500, error);
        }
    }

    async function getByEmail(email){
        const options = `where email='${email}'`;
        try {
            const userLogin = await db.getWithOptions(TABLE,options);
            if(userLogin.length === 0) return undefined;
            return userLogin[0];
        } catch (error) {
            throw errorGenerator('serverError', 500, error);
        }
    }

    async function login(email, password){
       try {
            const userLogin = await getByEmail(email);
            if(!userLogin) throw errorGenerator('Unauthorized', 401, 'permission denied');
            const passwordIsCorrect = await auth.verifyPassword(password, userLogin.password)
            if(!passwordIsCorrect) throw errorGenerator('Unauthorized', 401, 'permission denied');
            return userLogin;
       } catch (error) {
            throw error;
       }



    }

    function getAll() {
        return store.getAll(TABLE)
    }
    
    function get(id){
        return store.get(TABLE, id);
    }

    function signToken(payload){
        return auth.sign(payload);
    }

    return {
        create,
        getAll,
        get, 
        getByEmail,
        login,
        signToken
    };
}

