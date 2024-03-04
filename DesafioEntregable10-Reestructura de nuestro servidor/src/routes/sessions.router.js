import { Router } from "express";
import passport from "passport";
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

//GITHUB
    //signup
    router.get(
        "/auth/github",
        passport.authenticate("github", { scope: ["user:email"] })
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

//LOGOUT
router.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect("/login"));
});

export default router