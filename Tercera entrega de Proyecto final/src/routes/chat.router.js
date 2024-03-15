import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = Router();

//POST
router.post("/", roleMiddleware("client"),chatController.createMessage);

//GET
router.get("/", chatController.findAllmessages);
router.get("/:idMessage", chatController.findMessageById);

//DELETE
router.delete("/:idMessage", chatController.deleteMessage);

export default router;