import express from 'express';
import { getAllMessagesFromALobby, postMessage } from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * /lobbies/{lobbyId}:
 *   get:
 *     summary: Get messages for a lobby
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               userId:
 *                 type: string
 *   post:
 *     summary: Post a message to a lobby
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: string
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               userId:
 *                 type: string
 * /lobbies/{lobbyId}/{messageId}:
 *   get:
 *     summary: Get a specific message from a lobby
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             userId:
 *               type: string
 */
router.get('/:lobbyId/messages', authMiddleware, getAllMessagesFromALobby);
router.post('/:lobbyId/messages', authMiddleware, postMessage);


export default router;
