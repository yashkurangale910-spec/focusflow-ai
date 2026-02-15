const errorMiddleware = (err, req, res, next) => {
    console.error(`❌ [ERROR] ${err.name}: ${err.message}`);

    // Log stack trace in development
    if (process.env.NODE_ENV !== 'production' && err.stack) {
        console.error(err.stack);
    }

    // Specific Error Handlers

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            status: 'error',
            code: 'VALIDATION_ERROR',
            error: message
        });
    }

    // Mongoose Bad ObjectId (CastError)
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            code: 'RESOURCE_NOT_FOUND',
            error: 'Resource not found'
        });
    }

    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            code: 'INVALID_TOKEN',
            error: 'Invalid authentication token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            code: 'TOKEN_EXPIRED',
            error: 'Authentication token has expired'
        });
    }

    // Default Error Response
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        code: err.code || 'INTERNAL_SERVER_ERROR',
        error: err.message || 'Internal Server Error'
    });
};

module.exports = errorMiddleware;
