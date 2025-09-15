// src/routes/store.js
import express from 'express';
import { addStoreHandler } from '../controllers/storeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/stores
router.post('/', protect, addStoreHandler);

export default router;
