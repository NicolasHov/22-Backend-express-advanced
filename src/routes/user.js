import express from 'express';
import { getAllUsers, getOneUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:userId', authMiddleware, getOneUser);

export default router;
