import { Router } from 'express'
import { productsController } from '../controllers/products.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

//GET
router.get("/", productsController.findAllProducts);

//POST
router.post("/", authMiddleware("admin"), productsController.createProduct);

//PUT 
router.put("/:pid",authMiddleware("admin"), productsController.updateProduct);

//DELETE
router.delete("/:pid",authMiddleware("admin"), productsController.deleteProduct);

export default router