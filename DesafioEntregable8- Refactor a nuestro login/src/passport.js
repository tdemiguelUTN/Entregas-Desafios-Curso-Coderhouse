import passport from "passport";
import { usersManager } from "./managers/UsersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

// LOCAL
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await usersManager.findByEmail(email);
        if (userDB) {
          return done(null, false);
        }
        const hashedPassword = await hashData(password);
        const cartCreate = await cartsManager.createOne({});
        const user = { ...req.body, cart: cartCreate, password: hashedPassword }
        const userCreate = await usersManager.createOne(user);
        done(null, userCreate);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const userDB = await usersManager.findByEmail(email);
        if (!userDB) {
          return done(null, false);
        }
        const isValid = await compareData(password, userDB.password);
        if (!isValid) {
          return done(null, false);
        }
        done(null, userDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

// GITHUB
passport.use("github",
  new GithubStrategy(
    {
      clientID: "Iv1.949989ef51fd5451",
      clientSecret: "89bb578cb7a0e3a4305f32e158c01cf9056eafdb",
      callbackURL: "http://localhost:8080/api/sessions/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      done(null, false);
      try {
        const userDB = await usersManager.findByEmail(profile._json.email);
        //login
        if (userDB) {
          if (userDB.from_github) {
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }
        //signup
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || "",
          email: profile._json.email || profile.emails[0].value,
          password: " ",
          from_github: true,
        };
        const userCreate = await usersManager.createOne(newUser);
        done(null, userCreate);
      } catch (error) {
        done(error);
      }
    }
  )
);

//metodos 
passport.serializeUser(function (user, done) {
  console.log("test");
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await usersManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});