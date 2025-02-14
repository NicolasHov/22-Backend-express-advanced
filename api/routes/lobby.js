import express from 'express';
import { getAllLobbies, addPlayerToLobby, createLobbyWithMessages } from '../controllers/lobbyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllMessagesFromALobby, getOneMessage, postMessage } from '../controllers/messageController.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Lobby
 *   description: Lobbies endpoints
 */

/**
 * @swagger
 * /lobbies:
 *   get:
 *     summary: Get a list of lobbies
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               coach:
 *                 type: object
 *               players:
 *                 type: array
 *               title:
 *                 type: string
 *   post:
 *     summary: Create a lobby
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
 *               lobbyId:
 *                 type: string
 */
router.get('/', getAllLobbies);
router.post('/', authMiddleware, createLobbyWithMessages);
router.post('/:lobbyId/players', authMiddleware, addPlayerToLobby);

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
router.get('/:lobbyId/messages/:messageId', authMiddleware, getOneMessage);
router.post('/:lobbyId/messages', authMiddleware, postMessage);


export default router;
