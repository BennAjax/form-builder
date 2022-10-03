import express, { Request, Response } from 'express';

const router = express.Router();

const health = (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.send({ status: 'OK' });
};

router.get('/health', health);

export default router;
