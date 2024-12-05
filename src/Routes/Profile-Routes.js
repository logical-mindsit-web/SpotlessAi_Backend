import { Router } from 'express';
import { getprofileDetails, updateUserPhoneNumber } from '../Controllers/profileControllers.js';


const router = Router();

// Route to get user details
router.get('/profiledetails', getprofileDetails);

// Route to update user phone number
router.put('/user/phone', updateUserPhoneNumber);


export default router;
