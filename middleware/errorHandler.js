// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const messages = Object.values(err.errors).map((val) => val.message);
        message = messages.join(', ');
    }

    // Mongoose duplicate key error (unique constraint)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value entered for '${field}'. This field must be unique.`;
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        statusCode = 404;
        message = `Resource not found with id: ${err.value}`;
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};

module.exports = errorHandler;
