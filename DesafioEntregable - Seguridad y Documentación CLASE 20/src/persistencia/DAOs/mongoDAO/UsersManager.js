import BasicManager from "../mongoDAO/BasicManager.js";
import { usersModel } from "../../db/models/users.model.js";

class UsersManager extends BasicManager {
    constructor() {
        super(usersModel,  { path: 'cart', populate: { path: 'products.product' } })
    }
    async findByEmail(email) {
        const response = await this.model.findOne({ email }).populate(this.populateOption);
        return response;
    }
}

export const usersManager = new UsersManager() 