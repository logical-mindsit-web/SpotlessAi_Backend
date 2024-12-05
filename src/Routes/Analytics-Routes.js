import { Router } from 'express';
import{saveRobotAnalytics } from "../Controllers/analyticsController.js"

const router = Router();

router.post('/robotanalytics', saveRobotAnalytics);

export default router;
