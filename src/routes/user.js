import express from 'express';
import { getAllUsers, getOneUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:userId', authMiddleware, getOneUser);

export default router;
