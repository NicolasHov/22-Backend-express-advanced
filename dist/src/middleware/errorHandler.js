export class McpError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
export const errorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = err instanceof McpError ? err.statusCode : 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors;
    res.status(statusCode).json({
        message: message,
        errors: errors,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
