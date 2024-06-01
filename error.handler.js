const ErrorHandler = (err, req, res, next) => {
    let errMsg = err.message || 'Something went wrong';
    let errStatus = err.statusCode || 500;

    
    // custom for mongoose
    const customError = errMsg.split(' ')

    if(parseInt(customError[0])) {
        errStatus = parseInt(customError[0])
    }

    // multer & validator
    if(err.stack.startsWith('MulterError:') || err.stack.startsWith('ValidationError:')) {
        errStatus = 400
    }

    res.status(errStatus || 500).json({
        success: false,
        status: errStatus,
        message: errMsg
    })
}

export default ErrorHandler