import { Router } from 'express'
import { paymentsController } from '../controllers/payments.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/payment-intents", authMiddleware, paymentsController.createPayment);


export default router;