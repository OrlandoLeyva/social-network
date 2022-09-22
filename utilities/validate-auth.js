const auth = require('../auth');
const { errorGenerator } = require('./error.generator');

const verifyAuth = ()=>{
    return function middleware(req,res,next) {
        try {
            const token = req.headers.authorization;
            if(!token) next(errorGenerator('Unauthorized', 401, 'Token is missing'));
            const payload = auth.decodeToken(token);
            req.user = payload;
            next();
        } catch (error) {
            next(errorGenerator('Unauthorized', 401, error.message));
        }
    }
}

module.exports = {verifyAuth};



