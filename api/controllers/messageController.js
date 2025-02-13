import Message from '../models/message.js';
import Lobbies from '../models/lobby.js';

export const getAllMessagesFromALobby = async (req, res) => {
    try {
        const { lobbyId } = req.params
        const messages = await Message.aggregate([
            { $match: { lobby: lobbyId } }
        ]);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const getOneMessage = async (req, res) => {
    try {
        const { lobbyId, messageId } = req.params
        let message = await Message.findOne({ messageId });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const postMessage = async (req, res) => {
    try {
        const { lobbyId } = req.params
        const playerId = req.userId;
        const { content } = req.body

        const message = new Message({
            player: playerId,
            lobby: lobbyId,
            content
        });

        await message.save();
        res.status(201).json({ message: 'Message created!', messageId: message._id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
