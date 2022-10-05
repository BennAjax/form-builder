import express from 'express';
import * as UserController from './user-controller';
import { login, signUp } from './validators';

const router = express.Router();

router.post('/signup', signUp, UserController.signup);
router.post('/login', login, UserController.login);

export default router;
