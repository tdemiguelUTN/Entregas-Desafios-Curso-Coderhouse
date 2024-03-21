import { ticketsModel } from "../../db/models/tickets.model.js";
import BasicManager from "../mongoDAO/BasicManager.js";

class TicketsManager extends BasicManager {
    constructor() {
        super(ticketsModel, "products.product");
    }
    async createOne(obj) {
        try {
            const createTicket = await this.model.create(obj);
            const populatedTicket = await createTicket.populate(this.populateOption);
            console.log(populatedTicket)
            return populatedTicket
        } catch (error) {
            console.log(error)
        }
      }
    
}



export const ticketsManager = new TicketsManager();