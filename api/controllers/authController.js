import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { McpError } from '../middleware/errorHandler.js';
import mongoose from 'mongoose';

export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new McpError(400, 'Validation failed', errors.array()));
    }

    const { username, email, password } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            return next(new McpError(409, 'Email already exists'));
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save({ session });
        await session.commitTransaction();
        res.status(201).json({ message: 'User registered!', userId: user._id });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};

export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new McpError(400, 'Validation failed', errors.array()));
    }

    const { email, password } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findOne({ email }).session(session);
        if (!user || !user.password) {
            return next(new McpError(401, 'Invalid credentials'));
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return next(new McpError(401, 'Invalid credentials'));
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('vercel_jwe', token, {
            domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost', // Automatically adjust for production or local            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,             // Prevent access via JavaScript (security)
            secure: process.env.NODE_ENV === 'production', // Send cookie over HTTPS only in production
            sameSite: 'Strict'          // Define SameSite policy
        });

        await session.commitTransaction();
        res.status(200).json({ "message": "User logged in", userId: user._id });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};
