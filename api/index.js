//Working on users and auths table...
//Create the auths controller.

//register users.
//test the auths and users request.

//create a table follow_user
//create posts table.

const { environment } = require('../environment/environment.config');

const express = require('express');
const usersRouter = require('./components/user/users.network');
const swaggerUI  = require('swagger-ui-express');
const swaggerDoc = require('../api/swagger.json'); 
const loginRouter = require('./components/auth/auths.network');
const { errorHandler } = require('../utilities/error.handler');
const postsRouter = require('./components/posts/posts.network');

const app = express();

app.use(express.json());

const apiRouter = express.Router();

require('../store/db.connection');

//ROUTES
app.use('/api/v1', apiRouter);
apiRouter.get('/', (req, res, next)=>{
    res.send('welcome to my API. access to http://localhost:3000/api/v1/api-docs/ to get the documentation')
})
apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter)
apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
apiRouter.use('/auth', loginRouter);

apiRouter.use(errorHandler);


app.listen(environment.port, ()=>{
    console.log(`server listening on http://localhost:${environment.port}/${environment.apiPath}`);
})