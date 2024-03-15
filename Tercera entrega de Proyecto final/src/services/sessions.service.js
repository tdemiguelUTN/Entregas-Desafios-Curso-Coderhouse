import { usersService } from "../services/users.service.js"

class SessionsService {
    async findUserById(id) {
        const response = await usersService.findById(id);
        return response;
    }
    async destroySession(req) {
        if (req.session) {
            req.session.destroy();
        } else {
            throw new Error();
        }
    }
};


export const sessionsService = new SessionsService();