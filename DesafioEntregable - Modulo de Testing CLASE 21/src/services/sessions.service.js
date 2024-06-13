import { usersService } from "../services/users.service.js"

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";


class SessionsService {
    async findUserById(id) {
        const response = await usersService.findById(id);
        if(!response) throw new CustomeError( ErrorMessages.USER_NOT_FOUND, 404);
        return response;
    }
    async destroySession(req) {
        if (req.session) {
            req.session.destroy();
        } else {
            throw new CustomeError ( ErrorMessages.SESSION_NOT_FOUND, 404);
        }
    }
};


export const sessionsService = new SessionsService();