import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { McpError } from '../middleware/errorHandler.js';
export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new McpError(400, 'Validation failed', errors.array()));
    }
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new McpError(409, 'Email already exists'));
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered!', userId: user._id });
    }
    catch (err) {
        next(err);
    }
};
export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new McpError(400, 'Validation failed', errors.array()));
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return next(new McpError(401, 'Invalid credentials'));
        }
        console.log(user.password);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return next(new McpError(401, 'Invalid credentials'));
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '1h' });
        res.json({ token, userId: user._id });
    }
    catch (err) {
        next(err);
    }
};
