import { Router } from "express";
import { productManager } from "../ProductManager.js";
const router = Router()

router.get("/home", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
})

router.get("/realTime", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products })
})

export default router