import express, { Router } from 'express';
import { asyncHandler } from '../../../helpers/asyncHandler';
import { appController } from './dependencies';

const router: Router = express.Router();

router.get('/youtube-title', asyncHandler(appController.getYoutubetitle.bind(appController)));
router.get('/pen', asyncHandler(appController.getExchangeRatePen.bind(appController)));

export default router;