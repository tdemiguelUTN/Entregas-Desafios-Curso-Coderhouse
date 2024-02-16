import { Router } from 'express'
import { usersManager } from '../managers/UsersManager.js'
import { cartsManager } from '../managers/CartsManager.js'
import { compareData, hashData } from '../utils.js';
import passport from "passport";
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

router.get("/:idUser", async (req, res) => {
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
        const createdUser = await usersManager.createOne(req.body);
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