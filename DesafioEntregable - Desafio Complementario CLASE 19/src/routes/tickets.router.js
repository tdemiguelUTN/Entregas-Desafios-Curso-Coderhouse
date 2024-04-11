import { Router } from "express";
import { ticketsController } from "../controllers/tickets.controller.js";
const router= Router();

//GET
router.get("/", ticketsController.findAllTickets);
router.get("/:idTicket", ticketsController.findTicketById);

//POST
router.post("/", ticketsController.createTicket);
router.post("/:idTicket", ticketsController.updateTicket);

//DELETE
router.delete("/:idTicket", ticketsController.deleteTicket);

export default router;