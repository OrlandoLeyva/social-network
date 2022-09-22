const express = require('express');

const response = require('../../../network/response');
const requestValidator = require('../../../utilities/request.validator');
const { userSchema } = require('../../schemas/users.schema');
const authController = require('../auth/index.auth');
const { verifyAuth } = require('../../../utilities/validate-auth');
const usersController = require('./users.index');

const usersRouter = express.Router();

//ready for test.
usersRouter.post('/signUp',
    requestValidator(userSchema,'body'),
    postUser
);

//In progress..
usersRouter.get('/', getAll)

usersRouter.get('/:id', get)

//In process.
usersRouter.patch('/update/:id',
    // verifyAuth(),
    updateUser
)

//MIDDLEWARES.
async function postUser(req,res,next){
    const body = req.body;
    try {
        const {login} = req.body;
        const loginDetails = await authController.create(login);
        const newUser = await usersController.create(body,loginDetails);
        // const responseStructure = response.success(null, 201, 'successful register', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getAll(req, res, next){
    try {
        // const users = await usersController.getAll();
        // const responseStructure = response.success(null, 200, 'successful request', users);
        res.json({message:'successful get request'});
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next){
    try {
        const user = await usersController.get(req.params['id']);
        const responseStructure = response.success(null,200,'successful request', user);
        res.status(200).json(responseStructure);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req,res,next){
    const id = req.params['id'];
    const changes = req.body;
    const response = await usersController.update(changes,id);
    res.send(response);
}

module.exports = usersRouter;