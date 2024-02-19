import passport from "passport";
import { usersManager } from "./managers/UsersManager.js";
import { cartsManager } from "./managers/CartsManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { hashData, compareData } from "./utils.js";
import { config } from "dotenv";   

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

//JWT TOKEN 
passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: config.jwt_secret_key,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   //config para extraer token de headers
    },
    async (jwt_payload, done) => {
      console.log("---jwt-passport---", jwt_payload);
      done(null, jwt_payload);
    }
  )
);

// GITHUB
passport.use("github",
  new GithubStrategy(
    {
      clientID: config.github_client_id,
      clientSecret: config.github_client_secret,
      callbackURL: config.github_callback_url,
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

//GOOGLE
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: config.google_callback_url,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile._json);
      try {
        const user = await usersManager.findByEmail(profile._json.email);
        //login
        if (user) {
          if (user.from_google) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
        // signup
        const createdCart = await cartsManager.createOne({ products: [] });
        const infoUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          email: profile._json.email,
          password: " ",
          cart: createdCart._id,
          from_google: true,
        };
        const createdUser = await usersManager.createOne(infoUser);
        done(null, createdUser);
      } catch (error) {
        done(error);
      }
      done(null, false);
    }
  )
);

//metodos 
passport.serializeUser(function (user, done) {
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