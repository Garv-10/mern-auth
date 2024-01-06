import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';
import { google } from '../controllers/auth.controller.js';
import { signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/google', google);
router.get('/signout', signout);

export default router; 