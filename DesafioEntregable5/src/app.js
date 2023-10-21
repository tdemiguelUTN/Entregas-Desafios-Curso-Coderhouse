import express from 'express';
import { __dirname } from './utils.js';
import handlebars from "express-handlebars";
import usersRouter from './routes/users.router.js';
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js';
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js"
import "./dao/db/configDB.js";

const app = express();
const PORT = 8080;

//middleware para procesar y analizar datos de solicitudes entrantes 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/carts", cartsRouter);

//inicializacion servidor express
app.listen(PORT, () =>{
    console.log("Server is running on port 8080")
})