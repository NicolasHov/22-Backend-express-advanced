import express from 'express';
import { createLobby, addPlayerToLobby } from '../controllers/lobbyController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();
router.post('/', authMiddleware, createLobby);
router.post('/:lobbyId/players', authMiddleware, addPlayerToLobby);
export default router;
