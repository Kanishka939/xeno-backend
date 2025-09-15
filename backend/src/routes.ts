// backend/src/routes.ts
import express from 'express';
import { addStoreHandler } from './controllers/storeController';

const router = express.Router();

router.post('/stores/add', addStoreHandler);

export default router;
