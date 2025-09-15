import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import storeRoutes from './routes/store.js';
import shopifyRoutes from './routes/shopify.js';

import dashboardRoutes from './routes/dashboard.js';

dotenv.config();
const app = express();


// Middleware first
app.use(cors());
app.use(express.json());
app.use('/api/stores', storeRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/shopify', shopifyRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Default route
app.get('/', (req, res) => res.send('Finshop backend running 🚀'));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

export default app;
