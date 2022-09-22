exports.success = (error,statusCode,message,data)=>{
    return {
        error,
        statusCode,
        message,
        data
    }
};

exports.error = (error, req, res, status, message) =>{
    res.status(status).json({
        error,
        statusCode:status,
        message
    })
};

