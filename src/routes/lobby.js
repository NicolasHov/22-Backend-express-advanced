import express from 'express';
import { getLobby, createLobby, addPlayerToLobby } from '../controllers/lobbyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getMessages, getOneMessage, postMessage } from '../controllers/messageController.js';

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
router.get('/', getLobby);
router.post('/', authMiddleware, createLobby);
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
router.get('/:lobbyId/', authMiddleware, getMessages);
router.get('/:lobbyId/:messageId', authMiddleware, getOneMessage);
router.post('/:lobbyId/', authMiddleware, postMessage);


export default router;
