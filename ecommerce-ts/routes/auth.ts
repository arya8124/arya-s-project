import express, { Request, Response } from 'express';
import { signUp, signIn, getProfile, logout } from '../controller/authController';
import authenticateToken from '../middlewares/authenticatToken';

const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);

export default router;
