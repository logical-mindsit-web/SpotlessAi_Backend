// routes/robotRoutes.js

import { Router } from 'express';
import { getRobotsByEmail} from '../Controllers/robotController.js';


const router = Router();

router.get('/robots',  getRobotsByEmail);

export default router;
