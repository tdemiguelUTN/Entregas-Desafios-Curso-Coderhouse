import { usersService } from "../services/users.service.js"

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

class SessionsService {
    async findUserById(id) {
        const response = await usersService.findById(id);
        if(!response) CustomeError.createError( ErrorMessages.USER_NOT_FOUND);
        return response;
    }
    async destroySession(req) {
        if (req.session) {
            req.session.destroy();
        } else {
            CustomeError.createError( ErrorMessages.SESSION_NOT_FOUND);
        }
    }
};


export const sessionsService = new SessionsService();