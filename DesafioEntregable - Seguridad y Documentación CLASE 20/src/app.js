import express from 'express';
import { Server } from 'socket.io';
import { __dirname } from "./utils.js"
import Handlebars from 'handlebars'
import { engine } from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

import usersRouter from './routes/users.router.js';
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js';
import sessionsRouter from "./routes/sessions.router.js"
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js"
import ticketsRouter from "./routes/tickets.router.js"
import loggerRouter from "./routes/logger.router.js"
//import messagesRouter from "./routes/messages.router.js";

import mongoStore from "connect-mongo";
import session from 'express-session';
import cookieParser from 'cookie-parser';

import passport from "passport";
import "./utils/passport.js";
import config from './config.js';
import "./persistencia/db/configDB.js";
import { chatService } from "./services/chat.service.js";
import logger from "./utils/winston.js"

import { swaggerSetup } from './utils/swaggerSpecs.js';
import swaggerUi from 'swagger-ui-express';

//configuracion 
const app = express();
const PORT = config.port

//middleware para procesar y analizar datos de solicitudes entrantes. Cookies 
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//session
app.use(
  session({
    secret: 'secreto123',
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: config.mongo_uri,
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
app.use("/api/sessions", sessionsRouter);
app.use("/api/chat" , chatRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/loggerTest", loggerRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

//app.use("/api/messages", messagesRouter);

// servidor http
const httpServer = app.listen(PORT, () => {
  logger.info("Server is running");
})

//SOCKETS
  //servidor para trabajar con sockets dentro de nuestro servidor 
const socketServer = new Server(httpServer);

  //escucha si el cliente se conecta
  //dentro estan escuchando los eventos para ejecutar el chat 
socketServer.on("connection", (socket) => {
  logger.info(`Cliente conectado ${socket.id}`);
  socket.on("disconnect", () => {
    logger.info(`Cliente desconectado ${socket.id}`);
  });
  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUserBroadcast", user);
  });

  socket.on("message", async (info) => {
    await chatService.createOne(info);
    const messages = await chatService.findAll({});
    socketServer.emit("chat", messages);
  });
});
