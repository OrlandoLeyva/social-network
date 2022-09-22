const joi = require("joi");
const boom = require('@hapi/boom');
const { errorGenerator } = require("./error.generator");

const requestValidator = (schema,property)=>{
    return function middleware(req,res,next){
        const data = req[property];
        const {error} = schema.validate(data);
        if(error) {
            const errorMessage = error.details[0].message;
            next(errorGenerator('Bad request', 400, errorMessage));
        }
        next();
    }
}

module.exports = requestValidator;