import express from 'express';
import { getMessages, postMessage } from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', authMiddleware, postMessage);


export default router;
