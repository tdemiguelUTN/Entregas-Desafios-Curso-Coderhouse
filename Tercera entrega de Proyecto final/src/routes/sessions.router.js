import { Router } from "express";
import { sessionsController } from "../controllers/sessions.controller.js"
import passport from "passport";
const router = Router();

//CURRENT
router.get("/current", sessionsController.findUser);

//LOGOUT
router.post('/logout', sessionsController.destroySession);

//LOCAL 
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

//GITHUB
    //signup
    router.get(
        "/auth/github",
        passport.authenticate("github", 
        { scope: ["user:email"] })
    );

    //login
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

//GOOGLE 
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/error" }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/home");
      }
);

export default router