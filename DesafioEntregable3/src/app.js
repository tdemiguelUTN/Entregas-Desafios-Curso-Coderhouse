import express from 'express';   //forma recomendada 
import { productManager }  from "./ProductManager.js"; //importo la instancia de la clase 

const app = express();

app.listen(8080,()=>console.log("Escuchando el puerto 8080"))

app.use(express.json());                                  //para que el servidor entienda la info que le llega, defino esto
app.use(express.urlencoded({ extended: true }))


app.get('/products', async (req, res) => {
    //voy a recibir el limite a traves de todo el req.query 
    //const {limit} = req.query   esto lo hago dentro de get.products, desestructurando el array y quedandome con el atributo "limit" 
    try {
        const products = await productManager.getProducts(req.query)
     if (!products.length){
        return res.status(200).json({message: "no hay productos"})
        }
        res.status(200).json({message: "productos encontrados", products})
    }     catch (error) {
        res.status(500).json({ message: error.message });
        }
});

app.get('/products/:idProduct', async (req, res) => {
    const {idProduct} = req.params
  try {
    const product = await productManager.getProductByld(+idProduct)        //convierto el idProduct de un string a un valor numerico con el +. Mi funcion getProductById espera recibir un numero
    if (!product){
        return res.status(400).json({message: "no se encontro un producto con ese Id"})
    }
    res.status(200).json({message: "producto encontrado!", product})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
