import { Router } from 'express';
import UserHandler from '../handlers/user';

const router = Router();

router.post('/register', UserHandler.register);
router.post('/login', UserHandler.login);

export default router;
