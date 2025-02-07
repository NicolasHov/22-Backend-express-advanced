import jwt from 'jsonwebtoken';
import { McpError } from './errorHandler.js';
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new McpError(401, 'Not authenticated'));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new McpError(401, 'Not authenticated'));
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        return next(new McpError(401, 'Not authenticated'));
    }
};
