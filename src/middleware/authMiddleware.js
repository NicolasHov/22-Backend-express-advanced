import jwt from 'jsonwebtoken';
import { McpError } from './errorHandler.js';

export const authMiddleware = (req, res, next) => {
    const authCookie = req.cookies['authcookie'];

    if (!authCookie) {
        return next(new McpError(401, 'Not authenticated'));
    }

    try {
        const decodedCookie = jwt.verify(authCookie, process.env.JWT_SECRET || 'supersecretkey');
        req.userId = decodedCookie.userId;
        next();
    } catch (err) {
        return next(new McpError(401, 'Not authenticated'));
    }
};
