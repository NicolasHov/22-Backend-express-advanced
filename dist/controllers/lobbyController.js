import Lobby from '../models/lobby';
import User from '../models/user';
import { McpError } from '../middleware/errorHandler';
export const createLobby = async (req, res, next) => {
    try {
        const coachId = req.userId;
        const lobby = new Lobby({
            coach: coachId,
            players: [],
        });
        await lobby.save();
        res.status(201).json({ message: 'Lobby created!', lobbyId: lobby._id });
    }
    catch (err) {
        next(err);
    }
};
export const addPlayerToLobby = async (req, res, next) => {
    const { lobbyId } = req.params;
    const { playerId } = req.body;
    try {
        const lobby = await Lobby.findById(lobbyId);
        if (!lobby) {
            return next(new McpError(404, 'Lobby not found'));
        }
        const player = await User.findById(playerId);
        if (!player) {
            return next(new McpError(404, 'Player not found'));
        }
        if (lobby.players.includes(playerId)) {
            return next(new McpError(409, 'Player already in lobby'));
        }
        lobby.players.push(playerId);
        await lobby.save();
        res.json({ message: 'Player added to lobby!', lobby });
    }
    catch (err) {
        next(err);
    }
};
