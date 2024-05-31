const ErrorHandler = (err, req, res, next) => {
    let errStatus = err.statusCode || 500;
    let errMsg = err.message || 'Something went wrong';

    // multer
    errStatus = err.stack.startsWith('MulterError:') && 400
    errStatus = err.stack.startsWith('ValidationError:') && 400

    res.status(errStatus || 500).json({
        success: false,
        status: errStatus,
        message: err.message
    })
}

export default ErrorHandler