const joi = require('joi');
const { loginSchema } = require('./auth.schema ');

const id  = joi.number().integer();
const name = joi.string();
const lastName = joi.string();

const userSchema = joi.object({
    name: name.required(),
    last_name: lastName.required(),
    login: loginSchema.required()
})

const followUserSchema = joi.object({
    followedUserId: id.required()
})

module.exports = {userSchema,followUserSchema};