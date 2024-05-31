const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Hadnling");
    let errStatus = err.statusCode || 500;
    let errMsg = err.message || 'Something went wrong';

    // multer
    errStatus = err.stack.startsWith('MulterError: Unexpected field') && 400

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg
    })
}

export default ErrorHandler