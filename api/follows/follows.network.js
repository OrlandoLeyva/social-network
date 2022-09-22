const express = require('express');
const requestValidator = require('../../utilities/request.validator');
const { verifyAuth } = require('../components/user/user.secure');
const { followUserSchema } = require('../schemas/users.schema');


const followsRouter = express.Router();

followsRouter.post('/',
    verifyAuth(),
    requestValidator(followUserSchema,'body'),
    followUser
)

//MIDDLEWARES.

async function followUser(req,res,next){
    const {followUserId} = req.body;
    try {
        const response = followsController
    } catch (error) {
        
    }
}