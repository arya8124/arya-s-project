import express from 'express';
import { createPurchase, getUserPurchases, getPurchaseById } from '../controller/purchaseController';
import authenticateToken from '../middlewares/authenticatToken';

const router = express.Router();

router.post('/purchase', authenticateToken, createPurchase);
router.get('/purchases', authenticateToken, getUserPurchases);
router.get('/purchase/:purchaseId', authenticateToken, getPurchaseById);

export default router;
