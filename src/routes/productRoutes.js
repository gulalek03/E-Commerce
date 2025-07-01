import express from 'express';
const router = express.Router();

import { authenticate, authorize } from '../../middleWare/authMiddleware.js';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addImageToProduct,
  getProductImages,
  deleteImage
} from '../../controllers/productController.js';

// Ürünleri listelemek herkese açık
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// CRUD işlemleri için admin yetkisi gerekli
router.post('/', authenticate, authorize(['admin']), createProduct);
router.put('/:id', authenticate, authorize(['admin']), updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);

// Resim işlemleri
router.post('/:product_id/images', authenticate, authorize(['admin']), addImageToProduct);
router.get('/:product_id/images', getProductImages);
router.delete('/images/:image_id', authenticate, authorize(['admin']), deleteImage);

export default router;
