import BasicManager from "../managers/BasicManager.js";
import { usersModel } from "../dao/db/models/users.model.js";

class UsersManager extends BasicManager {
    constructor(){
        super(usersModel)
    }
}

export const usersManager = new UsersManager() 