import { Router } from 'express'
import { productsController } from '../controllers/products.controller.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

//GET
router.get("/", productsController.findAllProducts);
router.get("/:pId", productsController.findProductById);
router.get("/mocking/products", productsController.generateProducts);

//POST
router.post("/", roleMiddleware(["admin","premium"]), productsController.createProduct);

//PUT 
router.put("/:pid",roleMiddleware("admin"), productsController.updateProduct);

//DELETE
router.delete("/:pid",roleMiddleware(["admin","premium"]), productsController.deleteProduct);

//Regex 
router.param("pId", (req, res, next, cId) => {
    const regex = /^[a-fA-F0-9]{24}$/;
    if (!regex.test(cId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    next();
});

export default router