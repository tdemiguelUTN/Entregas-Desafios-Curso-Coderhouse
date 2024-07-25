import { paymentsService } from '../services/payments.service.js';
import CustomeError from '../errors/custome-error.js';

class PaymentsController {
  createPayment = async (req, res) => {
    try {
      const { pid } = req.query
      const result = await paymentsService.createPayment( pid );
      res.status(200).json({ payment: result });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };
}

export const paymentsController = new PaymentsController();