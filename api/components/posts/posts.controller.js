const db = require('../../../store/db.queries');

const TABLE = 'posts';

module.exports = function postsController(){
    async function create(post){
        try {
            const newPost = await db.insert(TABLE, post);
            return newPost;
        } catch (error) {
            throw error;
        }
    }

    return {
        create
    }
}