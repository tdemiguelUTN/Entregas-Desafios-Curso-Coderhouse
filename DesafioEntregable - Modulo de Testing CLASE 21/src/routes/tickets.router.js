import { Router } from "express";
import { ticketsController } from "../controllers/tickets.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router= Router();

//GET
router.get("/", authMiddleware, ticketsController.findAllTickets);
router.get("/:idTicket", authMiddleware, ticketsController.findTicketById);

//POST
router.post("/", authMiddleware, ticketsController.createTicket);
router.post("/:idTicket", authMiddleware, ticketsController.updateTicket);

//DELETE
router.delete("/:idTicket", authMiddleware, ticketsController.deleteTicket);

export default router;