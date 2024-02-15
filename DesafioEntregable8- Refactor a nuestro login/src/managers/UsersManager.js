import BasicManager from "../managers/BasicManager.js";
import { usersModel } from "../dao/db/models/users.model.js";

class UsersManager extends BasicManager {
    constructor() {
        super(usersModel)
    }
    async findByEmail(email) {
        const response = await usersModel.findOne({ email });
        return response;
    }
}

export const usersManager = new UsersManager() 