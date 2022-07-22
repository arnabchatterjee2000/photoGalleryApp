import express from 'express';
import { signinUser, signupUser } from '../controllers/user.js';

const router = express.Router();

router.put('/signup', signupUser);

router.post('/signin', signinUser);

export default router;
