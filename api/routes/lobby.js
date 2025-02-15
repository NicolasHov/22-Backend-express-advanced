import express from 'express';
import { getAllLobbies, addPlayerToLobby, createLobbyWithMessages } from '../controllers/lobbyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

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


export default router;
