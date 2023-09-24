import { Router } from "express";
import { CarritoManager } from "../CartsManager";

const router = Router()

router.post('/', async (req, res) => {
    try {
        const carrito = CarritoManager.addCarrito()
        res.status(200).json({ message: "se añadi;o un nuevo carrito", carrito })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})

router.get('/:cId', async (req, res) => {
    const { cId } = req.params
    try {
        const carrito = await CarritoManager.getCarritoByld(+cId)
        if (carrito == "No se encontró un carrito con este id") {
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
        const carrito = CarritoManager.addProductCarrito(pId, cId)
        res.status(200).json({ message: "se agrego el producto al carrito correctamente!" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router