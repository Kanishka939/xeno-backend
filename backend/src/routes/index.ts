// backend/src/routes/index.ts
import express from 'express';
import authRoutes from './auth.js';
import storeRoutes from './store.js';
import dashboardRoutes from './dashboard.js';

const router = express.Router();

router.use('/auth', authRoutes);           // Auth routes
router.use('/dashboard', dashboardRoutes); // Protected dashboard
router.use('/stores', storeRoutes);        // Protected store routes

export default router;
