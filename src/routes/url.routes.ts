import express, { Router } from 'express';
import { shortenUrl, redirectToOriginalUrl } from '../controllers/url.controller';

const router: Router = express.Router();

router.post('/api/shorten', shortenUrl);
router.get('/:shortenedUrl', redirectToOriginalUrl);

export default router;