import express from 'express';
import { authenticate, authorize } from '../../middleWare/authMiddleware.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../../controllers/userController.js';

const router = express.Router();

// Admin only routes
router.get('/', authenticate, authorize(['admin']), getAllUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser); // user can update their own, admin can update any
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

export default router;
