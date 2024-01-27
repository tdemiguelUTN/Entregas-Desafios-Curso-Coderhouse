import { Router } from "express";
import { cartsManager } from "../managers/CartsManager.js";

const router = Router()

//post
router.post('/', async (req, res) => {
    try {
        const cart = await cartsManager.createOne()
        res.status(200).json({ message: "se añadio un nuevo carrito", cart })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.post('/:cId/product/:pId', async (req, res) => {
    const { cId } = req.params
    const { pId } = req.params
    try {
        const cart = await cartsManager.addProductCarrito(cId, pId)
        if (cart == -2) return res.status(400).json({ message: "no existe el producto que desea agregar al carrito" })
        if (cart == -1) return res.status(400).json({ message: "no existe ese carrito para agregar un producto" })
        res.status(200).json({ message: "se agrego el producto al carrito correctamente!", cart })
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
})

//get
router.get('/:cId', async (req, res) => {
    const { cId } = req.params
    try {
        const cart = await cartsManager.findById(cId)
        if (cart == null) {
            return res.status(400).json({ message: "no se encontro un carrito con ese Id" })
        }
        res.status(200).json({ message: "carrito encontrado!", cart })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//put
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartsManager.updateCarrito(cid, pid, quantity);
        if (cart == -2) return res.status(400).json({ message: "no existe ese carrito para actualizar la cantidad de ejemplares del producto" })
        if (cart == -1) return res.status(400).json({ message: "no existe ese producto para actualizar su cantidad" })
        res.status(200).json({ message: "cantidad de producto actualizada!", cart })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
})

//delete
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartsManager.deleteProduct(cid, pid);
        if (cart == -1) {
            return res.status(400).json({ message: "no se encontro el producto en el carrito" })
        }
        if (cart == -2) {
            return res.status(400).json({ message: "no se encontro un carrito con ese id" })
        }
        res.status(200).json({ message: "producto eliminado con exito!", cart })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cartDelete = await cartsManager.deleteCart(cid);
        if (!cartDelete == []) return res.status(400).json({ message: "el carrito se encuentra vacio" })
        return res.status(400).json({ message: "los productos del carrito se borraron con exito!" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router