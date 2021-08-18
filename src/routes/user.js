import { Router } from 'express';
import { validator } from '../middlewares/validator';
import UserHandler from '../handlers/user';
import UserValidator from '../validators/user';

const router = Router();

router.post('/register', validator(UserValidator.register), UserHandler.register);
router.post('/login', validator(UserValidator.login), UserHandler.login);

export default router;
