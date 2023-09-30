import { Router } from "express";
import { carritoManager } from "../CartsManager.js";
import { ERRORES_CARRITOS } from '../errores.js';

const router = Router()

router.post('/', async (req, res) => {
    try {
        const carrito = await carritoManager.addCarrito()
        res.status(200).json({ message: "se añadio un nuevo carrito", carrito })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get('/:cId', async (req, res) => {
    const { cId } = req.params
    try {
        const carrito = await carritoManager.getCarritoByld(+cId)
        if (carrito == -1) {
            return res.status(400).json({ message: "no se encontro un carrito con ese Id" })
        }
        res.status(200).json({ message: "carrito encontrado!", carrito })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

router.post('/:cId/product/:pId', async (req, res) => {
    const { cId } = req.params
    const { pId } = req.params
    try {
        const carrito = await carritoManager.addProductCarrito(+cId, +pId)
        if (carrito == -2) return res.status(400).json({ message: "no existe ese carrito para agregar un producto" })
        if (carrito == -1) return res.status(400).json({ message: "no existe el producto que desea agregar al carrito" })
        res.status(200).json({ message: "se agrego el producto al carrito correctamente!" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router