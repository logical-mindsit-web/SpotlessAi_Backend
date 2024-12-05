import { Router } from 'express';
const router = Router();

import { validateUser, verifyOtp, createPassword, login, forgotPasswordOtpVerify, forgotPasswordOtpSend, forgetResetPassword } from '../Controllers/authController.js';

//vefify
router.post('/validate-user', validateUser);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', createPassword);

//forget password 
router.post('/forget-password', forgotPasswordOtpSend);
router.post('/password-otp-verify', forgotPasswordOtpVerify);
router.post("/forget-reset-password",forgetResetPassword);

//login both admin and user same endpoint
router.post('/login', login);

export default router;
