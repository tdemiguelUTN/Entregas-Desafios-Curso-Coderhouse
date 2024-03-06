import { ticketsManager } from "../persistencia/DAOs/mongoDAO/TicketsManager.js";

export class TicketsService {
    async findAll() {
        const response = await ticketsManager.findAll();
        return response;
    }

    async findById(id) {
        const response = await ticketsManager.findById(id);
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