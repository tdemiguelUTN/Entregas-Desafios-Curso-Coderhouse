import { ticketsManager } from "../persistencia/DAOs/mongoDAO/TicketsManager.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

export class TicketsService {
    async findAll() {
        const response = await ticketsManager.findAll();
        if (response == null) throw new CustomeError(ErrorMessages.TICKETS_NOT_FOUND, 404);
        return response;
    }

    async findById(id) {
        const response = await ticketsManager.findById(id);
        if (!response) throw new CustomeError(ErrorMessages.TICKET_NOT_FOUND, 404);
        return response;
    }

    async createOne(obj) {
        const response = await ticketsManager.createOne(obj);
        //FALTA ERROR
        return response;
    }
    async updateOne(obj) {
        const { id, ...user } = obj;
        const response = await ticketsManager.updateOne(id, ...user);
        //FALTA ERROR
        return response;
    }
    async deleteOne(id) {
        const response = await ticketsManager.deleteOne(id);
        //FALTA ERROR
        return response;
    }
}

export const ticketsService = new TicketsService();