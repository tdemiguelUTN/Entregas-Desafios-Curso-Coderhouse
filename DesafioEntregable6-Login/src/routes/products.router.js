import { Router } from 'express'
import { productsManager } from '../managers/ProductsManager.js'
 
const router = Router();

//get
router.get("/", async (req, res) => {
    try {
        const products = await productsManager.findAllProducts(req.query);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

//post
router.post("/", async (req, res) => {
    console.log(req.body);
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router