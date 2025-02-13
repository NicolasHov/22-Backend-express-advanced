import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
    res.send("you're connected");
})
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
