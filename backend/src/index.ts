import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import config from './config/default';
import router from './routes';
import APIError from './lib/errors/api-error';

const PORT = config.port || 4000;
const app = express();

if (process.env.NODE_ENV !== 'TEST') {
  mongoose
    .connect(config.mongodb.dsn, config.mongodb.options)
    .then(() => console.log('Successfully connected to MongoDb'))
    .catch(err => console.log('Could not connect to MongoDb', err));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => res.status(404).json({ error: 'Resource Not Found' }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof APIError) {
    return res.status(err.status).json({ success: err.success, status: err.message, details: err.meta });
  }

  return res.status(500).json({ success: false, status: 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'TEST') {
  app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
  });
}

export default app;
