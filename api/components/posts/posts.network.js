const express = require('express');
const requestValidator = require('../../../utilities/request.validator');
const { verifyAuth } = require('../../../utilities/validate-auth');
const { postSchema } = require('../../schemas/posts.schema');
const postsController = require('./posts.index');
const usersController = require('../user/users.index');
const response = require('../../../network/response');

const postsRouter = express.Router();

//Routes.
postsRouter.post('/',
    verifyAuth(),
    requestValidator(postSchema, 'body'),
    postContent
)

//Middlewares.
async function postContent(req,res,next){
    try {
        const {loginId} = req.user;
        const content = req.body;
        const result = await usersController.filter(`where login_id='${loginId}'`);
        content.user_id = result[0].id;
        const newPost = await postsController.create(content);
        const responseStructure = response.success(null,201,'post created successfully', content);
        res.status(201).json(responseStructure);
    } catch (error) {
        console.log(error);
    }
}

module.exports = postsRouter;