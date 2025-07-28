import express, { Request, Response } from 'express';
import { getAllProducts, getProductById, getAvailableProducts, getUnavailableProducts, createProduct, purchaseProduct } from '../controller/productController';
import authenticateToken from '../middlewares/authenticatToken';

const router = express.Router();

router.get('/allproducts', getAllProducts);
router.get('/product/:id', getProductById);
router.get('/products/available', getAvailableProducts);
router.get('/products/unavailable', getUnavailableProducts);
router.post('/createproduct', createProduct);
router.post('/products/:id/purchase', authenticateToken, purchaseProduct);

export default router;
