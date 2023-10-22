import { Router } from "express";
import { cartsManager } from "../managers/CartsManager.js";

const router = Router()

router.post('/', async (req, res) => {
    try {
        const cart = await cartsManager.addCarrito()
        res.status(200).json({ message: "se añadio un nuevo carrito", cart })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get('/:cId', async (req, res) => {
    const { cId } = req.params
    try {
        const cart = await cartsManager.getCarritoByld(+cId)
        if (cart == -1) {
            return res.status(400).json({ message: "no se encontro un carrito con ese Id" })
        }
        res.status(200).json({ message: "carrito encontrado!", cart })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/:cId/product/:pId', async (req, res) => {
    const { cId } = req.params
    const { pId } = req.params
    try {
        const cart = await cartsManager.addProductCarrito(+cId, +pId)
        if (cart == -1) return res.status(400).json({ message: "no existe ese carrito para agregar un producto" })
        if (cart == -2) return res.status(400).json({ message: "no existe el producto que desea agregar al carrito" })
        res.status(200).json({ message: "se agrego el producto al carrito correctamente!", cart })
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
})

export default router