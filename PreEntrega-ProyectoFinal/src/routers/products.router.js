import { Router } from "express";
import { productManager } from "../ProductManager.js";
import { ERRORES_PRODUCTOS } from '../errores.js';

// Utiliza los objetos de errores según sea necesario


const router = Router()

router.get('/', async (req, res) => {
    //voy a recibir el limite a traves de todo el req.query 
    //const {limit} = req.query   esto lo hago dentro de get.products, desestructurando el array y quedandome con el atributo "limit" 
    try {
        const products = await productManager.getProducts(req.query)
        if (!products.length) {
            return res.status(200).json({ message: "no hay productos" })
        }
        res.status(200).json({ message: "productos encontrados", products })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:pId', async (req, res) => {
    const { pId } = req.params
    try {
        const product = await productManager.getProductByld(+pId)        //convierto el idProduct de un string a un valor numerico con el +. Mi funcion getProductById espera recibir un numero
        if (product == -1) {
            return res.status(400).json({ message: "no se encontro un producto con ese Id" })
        }
        res.status(200).json({ message: "producto encontrado!", product })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const datosProductos = req.body
    try {
        const producto = await productManager.addProduct(datosProductos)
        if (producto == -1) return res.status(400).json({ message: "Este producto no tiene titulo" })
        if (producto == -2) return res.status(400).json({ message: "Este producto no tiene descripcion" })
        if (producto == -3) return res.status(400).json({ message: "Este producto no tiene precio" })
        if (producto == -4) return res.status(400).json({ message: "Este producto no tiene ruta de imagen" })
        if (producto == -5) return res.status(400).json({ message: "Este producto no tiene codigo identificador" })
        if (producto == -6) return res.status(400).json({ message: "Este producto no tiene stock" })
        if (producto == -7) return res.status(400).json({ message: "Este producto no tiene un valor verdadero de status" })
        if (producto == "Ya existe un producto con el mismo codigo") return res.status(400).json({ message: "Ya existe un producto con el mismo codigo" })

        return res.status(201).json({ message: "el producto se agregó con éxito!" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/:pId', async (req, res) => {
    const { pId } = req.params
    const body = req.body

    try {
        const product = await productManager.updateProduct(+pId, body)
        if (product == "No se puede actualizar este producto porque no existe") {
            return res.status(400).json({ message: "No se puede actualizar este producto porque no existe" })
        }
        return res.status(201).json({ message: "el producto se actualizó con éxito!" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

router.delete('/:pId', async (req, res) => {
    const { pId } = req.params
    try {
        const product = await productManager.deleteProduct(+pId)
        if (product == "El producto que se quiere eliminar no existe") {
            return res.status(400).json({ message: "El producto que se quiere eliminar no existe" })
        }
        return res.status(201).json({ message: "el producto se eliminó con éxito!" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router