import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

//POST
router.post("/", authMiddleware("client"),chatController.createMessage);

//GET
router.get("/", chatController.findAllmessages);
router.get("/:idMessage", chatController.findMessageById);

//DELETE
router.delete("/:idMessage", chatController.deleteMessage);

export default router;