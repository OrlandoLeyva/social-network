const joi = require('joi');

const email = joi.string();
const password = joi.string();

const loginSchema = joi.object({
    email: email.required(),
    password: password.required(),
})

module.exports = {loginSchema};