import express from 'express'
import { signup, login, logout } from '../controllers/auth.js'
import { isLoggesIn } from '../middlewares/auth.js';

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', isLoggesIn, logout)

export default router;
