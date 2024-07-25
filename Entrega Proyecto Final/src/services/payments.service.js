import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

class PaymentsService {
    async createPayment(body) {
        const { amount, description } = body;
        if (!amount || !description) throw new CustomeError(ErrorMessages.PAYMENT_DATA_REQUIRED, 400);

        const payment = await paymentsManager.createPayment(body);
        return payment;
    }
}

export const paymentsService = new PaymentsService();