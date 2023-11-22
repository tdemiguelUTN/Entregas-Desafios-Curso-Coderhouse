import express from 'express';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import handlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import usersRouter from './routes/users.router.js';
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js';
import viewsRouter from "./routes/views.router.js";

import "./dao/db/configDB.js";
import { chatManager } from './managers/ChatManager.js';

const app = express();
const PORT = 8080;
app.use(express.static(__dirname + "/public")); 

//middleware para procesar y analizar datos de solicitudes entrantes 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
app.engine("handlebars", handlebars.engine(
    {handlebars: allowInsecurePrototypeAccess(Handlebars)}
));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

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

    socket.on("message",async (info) => {
        await chatManager.createOne(info);
        const messages = await chatManager.findAll();
        socketServer.emit("chat", messages);
    });
});
