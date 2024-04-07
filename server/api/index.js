import { Router } from 'express';
import authRouter  from './auth.js';

const router = Router();

router.get('/health', (req, res, next) => {
  res.send('Server is up and running');
})

router.use('/auth', authRouter);

export default router;