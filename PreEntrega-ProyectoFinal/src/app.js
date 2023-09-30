import express from 'express';   //forma recomendada 
import productsRout from "./routers/products.router.js" //importo el archivo de las rutas de productos
import cartRout from "./routers/carts.router.js"        //importo el archivo de las rutas de cart

const app = express();

app.use(express.json());                                  //para que el servidor entienda la info que le llega, defino esto
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRout)
app.use("/api/carts", cartRout)

app.listen(8080, () => console.log("Escuchando el puerto 8080"))