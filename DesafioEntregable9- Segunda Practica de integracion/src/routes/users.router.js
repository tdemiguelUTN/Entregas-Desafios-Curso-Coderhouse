import { Router } from 'express'
import { usersManager } from '../managers/UsersManager.js'
import { cartsManager } from '../managers/CartsManager.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

//GET
router.get("/", async (req, res) => {
    try {
        const users = await usersManager.findAll();
        res.status(200).json({ message: "Users", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:idUser", jwtValidation, authMiddleware('admin'), async (req, res) => {
    const { idUser } = req.params;
    try {
        const user = await usersManager.findById(idUser);
        res.status(200).json({ message: "User", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//POST
router.post("/", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All data is required" });
    }
    try {
        const createdCart = await cartsManager.createOne();
        const createdUser = await usersManager.createOne({...req.body, cart: createdCart._id,});
        res.redirect(`/home/${createdUser._id}`);       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//LOGOUT
router.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect("/login"));
});

export default router;