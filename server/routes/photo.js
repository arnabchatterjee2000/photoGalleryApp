import express from 'express';
import { createPhoto, deletePhoto, getPhotos } from '../controllers/photo.js';
import { uploadImage } from '../helpers/imageUpload.js';
import { authProtection } from '../middlewares/authStrategy.js';
import { isOwner } from '../middlewares/ownerStrategy.js';

const router = express.Router();

router.put('/', authProtection, uploadImage, createPhoto);

router.get('/', authProtection, getPhotos);

router.delete('/:photoId', authProtection, isOwner, deletePhoto);

export default router;
