import express from 'express';
import userRoutes from './user.js';
import photoRoutes from './photo.js';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/photos', photoRoutes);

export default router;
