import User from '../models/user.js';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let user = await User.find().session(session).exec();
        res.status(200).json(user);
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
};

export const getOneUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req.params
        let user = await User.findOne({ userId }).session(session).exec();
        res.status(200).json(user);
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
};
