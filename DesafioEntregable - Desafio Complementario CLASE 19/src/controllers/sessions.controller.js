import { sessionsService } from "../services/sessions.service.js";

class SessionsController {
    getCurrentUser = async (req, res) => {           
        try {
            const { user } = req.session.passport;
            const result = await sessionsService.findUserById(user);
            res.status(200).json({ user: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    destroySession = async (req, res) => {
        try {
            await sessionsService.destroySession(req);
            res.redirect("/login");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export const sessionsController = new SessionsController();