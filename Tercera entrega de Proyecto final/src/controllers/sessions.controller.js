class SessionsController {
    findUser = async (req, res) => {            //TERMINAR
        try {
            const userData = req.session.user
            console.log(userData);
            res.status(200).json({ user: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    destroySession = async (req, res) => {
        try {
            req.session.destroy(() => res.redirect("/login"));
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export const sessionsController = new SessionsController();