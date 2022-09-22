function errorHandler(error,req,res,next){
    if(error.error === 'serverError'){
        console.log(error);
        error.message = 'Internal server error';
        res.status(error.status).json(error);   
    } else res.status(error.status).json(error);
    
}

module.exports = {errorHandler};