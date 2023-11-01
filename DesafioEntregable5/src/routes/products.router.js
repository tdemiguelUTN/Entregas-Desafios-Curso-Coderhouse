import { Router } from 'express'
import { productsManager } from '../managers/ProductsManager.js'
 
const router = Router();

router.get("/", async (req, res) => {
    const products = await productsManager.findAll(req.query);
    res.json({ products });
  });

router.post("/", async (res, req) => {
    const { name, price, stock } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: "Name and price are required" });
    }
    if (!stock) {
        delete req.body.stock;
    }
    try {
        const createdProduct = await productsManager.createOne(req.body);
        res
            .status(200)
            .json({ message: "Product created", product: createdProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router