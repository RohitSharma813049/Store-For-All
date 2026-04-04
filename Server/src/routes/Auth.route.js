import express from 'express';
const router = express.Router();
import { sendOTP, verifyOTP } from '../controllers/Auth/AuthController.js';

// Example route
router.get('/', (req, res) => {
    res.json({ message: 'Auth routes' });
});

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;