import { Router } from 'express';

import{saveRobotAnalytics } from "../Controllers/analyticsController.js"

import{saveRobotAnalytics2 } from "../Controllers/analyticsController2.js"

const router = Router();

router.post('/robotanalytics', saveRobotAnalytics);

router.post('/robotanalytics2', saveRobotAnalytics2);

export default router;