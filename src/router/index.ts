import express, { Application } from 'express';

import appRouter from '../comp/infrastructure/router';

export const API = (app: Application) => {
  const router = express.Router();
  app.use('/v1/', router);
  router.use('/exrate', appRouter);
}