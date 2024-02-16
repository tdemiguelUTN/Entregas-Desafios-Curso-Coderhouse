import express from 'express';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import Handlebars from 'handlebars'
import { engine } from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import usersRouter from './routes/users.router.js';
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js';
import sessionsRouter from "./routes/sessions.router.js"
import viewsRouter from "./routes/views.router.js";
import mongoStore from "connect-mongo";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from "passport";
import "./passport.js";

import "./dao/db/configDB.js";
import { chatManager } from './managers/ChatManager.js';

//configuracion 
const app = express();
const PORT = 8080;

//middleware para procesar y analizar datos de solicitudes entrantes. Cookies 
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//session
app.use(
  session({
    secret: "SESSIONSECRETKEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: 'mongodb+srv://thiagodemiguel:THIAGOALEXANDER2001@coderhousecluster.u2dphds.mongodb.net/CoderHouseCluster?retryWrites=true&w=majority',
    }),
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine("handlebars", engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions",sessionsRouter);

// servidor http
const httpServer = app.listen(PORT, () => {
  console.log("Server is running on port 8080")
})

//servidor para trabajar con sockets dentro de nuestro servidor 
const socketServer = new Server(httpServer);

//escucha si el cliente se conecta
//dentro estan escuchando los eventos para ejecutar el chat 
socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado ${socket.id}`);
  });
  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUserBroadcast", user);
  });

  socket.on("message", async (info) => {
    await chatManager.createOne(info);
    const messages = await chatManager.findAll();
    socketServer.emit("chat", messages);
  });
});
