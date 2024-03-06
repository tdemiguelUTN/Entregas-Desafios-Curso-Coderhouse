import { ticketsModel } from "../../db/models/tickets.model.js";
import BasicManager from "../mongoDAO/BasicManager.js";

class TicketsManager extends BasicManager {
    constructor() {
        super(ticketsModel);
    }
}

export const ticketsManager = new TicketsManager();