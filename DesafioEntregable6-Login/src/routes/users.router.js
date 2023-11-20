import { Router } from 'express'
import { usersManager } from '../managers/UsersManager.js'
import { cartsManager } from '../managers/CartsManager.js'
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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDB = await usersManager.findByEmail(email);
    if (!userDB) {
        return res.json({ error: "This email does not exist" });
    }
    req.session["email"] = email;
    req.session["first_name"] = userDB.first_name;
    req.session["cart"] = userDB.cart._id;
    if (email === "adminCoder@coder.com" && password === "Cod3r123") {
        req.session["isAdmin"] = true;
    }
    res.redirect("/products");
});

router.post("/signup", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body
        const cartCreate = await cartsManager.createOne({});
        const user = { ...req.body, cart: cartCreate }
        const userCreate = await usersManager.createOne(user);
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;