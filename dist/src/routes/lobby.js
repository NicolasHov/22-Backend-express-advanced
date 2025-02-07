import express from 'express';
import { createLobby, addPlayerToLobby } from '../controllers/lobbyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/:userId', authMiddleware, createLobby);
router.post('/:lobbyId/players', authMiddleware, addPlayerToLobby);
export default router;
