import express from 'express';

import { getVersionAndUserByEmail  } from '../Controllers/appController.js';

const router = express.Router();

// Route to get version and user details
router.get('/metadata', getVersionAndUserByEmail);

export default router;
