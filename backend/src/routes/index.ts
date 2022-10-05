import express, { Request, Response } from 'express';
import UserRouter from '../user/controllers/user-routes';
import FormRouter from '../form/controllers/form-routes';

const router = express.Router();

const health = (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.send({ status: 'OK' });
};

router.get('/health', health);

router.use('/user', UserRouter);
router.use('/', FormRouter);

export default router;
