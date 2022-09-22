// const nanoid = require('nanoid');
const {errorGenerator} = require('../../../utilities/error.generator');
const bcrypt = require('bcrypt');
const db = require('../../store/db.queries')

const TABLE = 'follows';

module.exports = function (injectedStore) {
    //In progress..
    async function create(fromUserId,toUserId){
       try {
            const data = {from_user: fromUserId, to_user: toUserId};
            const response = await db.insert(TABLE,data);
            return response;
       } catch (error) {
            throw errorGenerator('serverError',500,error);
       }
    }

//     //Ready for test.
//    async function getAll() {
//         try {
//             const users = await db.getAll(TABLE);
//             return users;
//         } catch (error) {
//             throw errorGenerator('serverError', 500, error.message);
//         }

//     }
    
//     async function get(id){
//         try {
//             const user = await db.get(TABLE,id);
//             console.log();
//             if(user.length === 0) throw errorGenerator('Not found', 404,'user not found')
//             return user;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async function update(changes,id){
//         try {
//             const response = await db.update(TABLE,changes,id);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

    return {
        create,
    };
}

