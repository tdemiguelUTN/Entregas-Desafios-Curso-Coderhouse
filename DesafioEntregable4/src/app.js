import express from "express"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"      //importacion de router 
import { __dirname } from "./utils.js"
import { Server } from "socket.io"
import { productManager } from "./ProductManager.js"

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); //paso la ruta absoluta de la carpeta public

app.engine('handlebars', handlebars.engine());   //configuracion de funcionalidades de handlebars
app.set('view engine', 'handlebars');
app.set('views', __dirname + "/views");


app.use('/', viewsRouter);       //defino la ruta raiz para utilizar viewsRouter 


const httpServer = app.listen(PORT, () => {                    //creacion de servidor de http que escucha el PORT (como uso Websocket, lo guardo en una constante)
    console.log(`escuchando al puerto ${PORT}`)
})

const socketServer = new Server(httpServer);               //creo una instancia de un servidor de Websocket asociado al server de http

socketServer.on("connection", (socket) => {                    //evento tipo conexion
    console.log(`Cliente conectado: ${socket.id}`)

    socket.on("createProduct", async (product) => {
        const newProduct = await productManager.createProduct(product)
        socket.emit('productCreated', newProduct)
    });
})
