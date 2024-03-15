import { ticketsManager } from "../persistencia/DAOs/mongoDAO/TicketsManager.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

class TicketsService {
    async findAll() {
        const response = await ticketsManager.findAll();
        if (response == null) CustomeError.createError(ErrorMessages.TICKETS_NOT_FOUND);
        return response;
    }

    async findById(id) {
        const response = await ticketsManager.findById(id);
        if(!response)  CustomeError.createError(ErrorMessages.TICKET_NOT_FOUND);
        return response;
    }

    async createOne(obj) {
        const response = await ticketsManager.createOne(obj);
        return response;
    }
    async updateOne(obj) {
        const { id, ...user } = obj;
        const response = await ticketsManager.updateOne(id, ...user);
        return response;
    }
    async deleteOne(id) {
        const response = await ticketsManager.deleteOne(id);
        return response;
    }
}

export const ticketsService = new TicketsService();