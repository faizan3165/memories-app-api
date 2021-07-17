import { Router } from 'express';
const router = Router();

import { signin, signup } from '../controllers/users.js';

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
