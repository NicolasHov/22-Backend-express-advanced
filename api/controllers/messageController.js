import Message from '../models/message.js';
import mongoose from 'mongoose';

export const getAllMessagesFromALobby = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { lobbyId } = req.params
        // const messages = await Message.aggregate([
        //     { $match: { lobbyId } }
        // ])
        const messages = await Message.find({ lobbyId })
            .session(session);
        res.status(200).json(messages);
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
};

export const postMessage = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { lobbyId } = req.params
        const playerId = req.userId;
        const { content } = req.body

        const message = new Message({
            player: playerId,
            lobbyId,
            content
        });

        await message.save({ session });
        await session.commitTransaction();
        res.status(201).json({ message: 'Message created!', messageId: message._id });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
};
