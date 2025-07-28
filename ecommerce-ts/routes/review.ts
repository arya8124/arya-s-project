import express, { Request, Response } from 'express';
import { getReviewsByProduct, createReview, updateReview, deleteReview } from '../controller/reviewController';
import authenticateToken from '../middlewares/authenticatToken';

const router = express.Router();

router.get('/product/:productId/reviews', getReviewsByProduct);
router.post('/review', authenticateToken, createReview);
router.put('/review/:reviewId', authenticateToken, updateReview);
router.delete('/review/:reviewId', authenticateToken, deleteReview);

export default router;
