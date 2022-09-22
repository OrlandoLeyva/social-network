const joi = require('joi');

//post: id, content, user_id,

const id = joi.number().integer();
const content = joi.string();

const postSchema = joi.object({
    content: content.required(),
})

module.exports = {postSchema};