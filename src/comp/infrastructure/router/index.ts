import express, { Router, Response, Request, NextFunction } from 'express';
import { AppController } from '../controller';
import { YoutubeTitle } from '../../application/youtube-title';
import { Cluster } from '../cluster';
import { asyncHandler } from '../../../helpers/asyncHandler';

const cluster = new Cluster(true, 750000);
const exchangeRate = new YoutubeTitle(cluster);
const appController = new AppController(exchangeRate);

const router: Router = express.Router();

router.get('/', asyncHandler(appController.getExchangeRate.bind(appController)));

export default router;