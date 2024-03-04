import { Router } from 'express'
import { productsController } from '../controllers/products.controller.js';
const router = Router();

//GET
router.get("/", productsController.findAllProducts);

//POST
router.post("/", productsController.createProduct);

//PUT 
router.put("/:pid", productsController.updateProduct);

//DELETE
router.delete("/:pid", productsController.deleteProduct);

export default router