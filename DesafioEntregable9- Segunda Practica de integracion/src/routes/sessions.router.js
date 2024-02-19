import { Router } from "express";
import passport from "passport";
import { usersManager } from "../managers/UsersManager.js";
import { cartsManager } from "../managers/CartsManager.js";
import { generateToken, compareData, hashData } from "../utils.js";
const router = Router();

//GOOGLE 
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/error" }),
    function (req, res) {
        req.session.user = req.user;
        res.redirect("/home");
    }
);

// JWT TOKEN
// login
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const userDB = await usersManager.findByEmail(email);
//         if (!userDB) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
//         comparacion de contraseñas hasheadas
//         const comparePassword = await compareData(password, userDB.password)
//         if (!comparePassword) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
//         const token = generateToken({
//             email,
//             first_name: userDB.first_name,
//             last_name: userDB.last_name,
//             role: userDB.role,
//         });

//         res.json("home", token);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// signup
// router.post("/signup", async (req, res) => {
//     const { first_name, last_name, email, password } = req.body;
//     if (!first_name || !last_name || !email || !password) {
//         res.status(400).json({ message: "All fields are required" });
//     }
//     try {
//         const userDB = await usersManager.findByEmail(email);
//         if (userDB) {
//             return res.status(401).json({ message: "User exists" });
//         }
//         const hashedPassword = await hashData(password);
//         const cartCreated = await cartsManager.createOne({});
//         const createdUser = await usersManager.createOne({
//             ...req.body,
//             cart: cartCreated,
//             password: hashedPassword,
//         });
//         res.redirect("/login");
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

//PASSPORT
    //signup
router.post(
    "/signup",
    passport.authenticate("signup", {
        successRedirect: "/login",
        failureRedirect: "/error",
    })
);
    //login
router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/error",
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/home");
    }
);

// GITHUB
router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/github",
    passport.authenticate("github", {
        failureRedirect: "/error",
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/home");
    }
);

export default router