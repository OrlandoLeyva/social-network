const express = require('express');
const response = require('../../../network/response');
const requestValidator = require('../../../utilities/request.validator');
const { loginSchema } = require('../../schemas/auth.schema ');
const authController = require('./index.auth');

const loginRouter = express.Router();

//In progress...
loginRouter.post('/login', 
    requestValidator(loginSchema, 'body'),
    login
);

loginRouter.get('/', getAll)

// usersRouter.get('/:id', get)


//middlewares

//THEY STILL KEEP THE USERS LOGIC BECAUSE i just copied and pasted.

async function login(req,res,next){
    try {
        const {email, password} = req.body;
        const userLogin = await authController.login(email, password);
        const payload = {
            loginId: userLogin.id,
            scope: userLogin.access
        }
        const token = authController.signToken(payload);
        const responseStructure = response.success(null, 201, 'successful login', {token})
        res.json(responseStructure);
    } catch (error) {
        next(error);
    }
}

async function getAll(req, res, next){
    const auths = await authController.getAll();
    res.json(auths);
}

// async function get(req, res, next){
//     try {
//         const data = await controller.get(req.params['id']);
//         response.success(null, req, res, 200, data)
//     } catch (error) {
//        response.error('not found', req, res, 404, error)
//     }
// }

module.exports = loginRouter;