import { Router } from "express";
import passport from "passport";
import { usersManager } from "../managers/UsersManager.js";
import { compareData, hashData } from "../utils.js";

const router = Router();

// //LOGIN

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email,password);
//     try {
//         const userDB = await usersManager.findByEmail(email);
//         if (!userDB) {
//             return res.status(401).json({ message: "Invalid credentials" });        }
//         //comparacion de contraseñas hasheadas
//         const comparePassword = await compareData(password, userDB.password)
//         if (!comparePassword) {
//             return res.status(401).json({ message: "Invalid credentials" });        }
//         req.session["email"] = email;
//         req.session["first_name"] = userDB.first_name;
//         req.session["cart"] = userDB.cart._id;
//         if (email === "adminCoder@coder.com" && password === "Cod3r123") {
//             req.session["isAdmin"] = true;
//         }
//         else req.session["isAdmin"] = false;
//         res.redirect("/products");
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// //SIGNUP
// router.post("/signup", async (req, res) => {
//     const { first_name, last_name, email, password } = req.body
//     try {
//         const userDB = await usersManager.findByEmail(email);
//         if (userDB) {
//             return res.json({ error: "email exist" });
//         }
//         const hashedPassword = await hashData(password);
//         const cartCreate = await cartsManager.createOne({});
//         const user = { ...req.body, cart: cartCreate, password: hashedPassword }
//         const userCreate = await usersManager.createOne(user);
//         res.redirect("/login");
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

//signup login PASSPORT
router.post(
    "/signup",
    passport.authenticate("signup", {
        successRedirect: "/login",
        failureRedirect: "/error",
    })
);

router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/error",
    }),
    (req, res) => {
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