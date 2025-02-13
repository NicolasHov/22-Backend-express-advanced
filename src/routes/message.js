import express from 'express';
import { getAllMessagesFromALobby, getOneMessage, postMessage } from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllMessagesFromALobby);
router.post('/', authMiddleware, postMessage);


export default router;
