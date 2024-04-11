import { ticketsService } from "../services/tickets.service.js";

class TicketsController {

  findAllTickets = async (req, res) => {
    try {
      const result = await ticketsService.findAll();
      res.status(200).json({ products: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  findTicketById = async (req, res) => {
    const { idTicket } = req.params;
    try {
      const result = await ticketsService.findById(idTicket);
      res.status(200).json({ Ticket: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createTicket = async (req, res) => {
    try {
      const result = await ticketsService.createOne(req.body);
      res.status(200).json({ ticket: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateTicket = async (req, res) => {
    const { id, ...obj } = req.body;
    try {
      if (!obj) {
        return res.status(400).json({ message: "All the fields are required" });
      }
      const result = await ticketsService.updateTicket(idTicket);
      res.status(200).json({ message: "Ticket update", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  deleteTicket = async (req, res) => {
    const { idTicket } = req.params;
    try {
      const result = await ticketsService.deleteOne(idTicket);
      res.status(200).json({ message: "Ticket delete", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const ticketsController = new TicketsController();