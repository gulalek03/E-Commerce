import express from 'express';
import { authenticate, authorize } from '../../middleWare/authMiddleware.js';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../../controllers/categoryController.js';

const router = express.Router();

// Public endpoints for getting categories
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Admin only for create, update, delete
router.post('/', authenticate, authorize(['admin']), createCategory);
router.put('/:id', authenticate, authorize(['admin']), updateCategory);
router.delete('/:id', authenticate, authorize(['admin']), deleteCategory);

export default router;
