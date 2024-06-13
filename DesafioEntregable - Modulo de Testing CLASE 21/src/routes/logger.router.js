import { Router } from "express";
import { loggerController } from "../controllers/logger.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

//GET
router.get('/', loggerController.testAllLogs);

export default router;

