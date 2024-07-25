import { Router } from 'express'
import { productsController } from '../controllers/products.controller.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { mockUserMiddleware } from '../middlewares/testUser.middleware.js';

const router = Router();

//GET
router.get("/", authMiddleware, productsController.findAllProducts);
router.get("/:pId", authMiddleware, productsController.findProductById);
router.get("/mocking/products", authMiddleware, productsController.generateProducts);

//POST
router.post("/", authMiddleware, roleMiddleware(["admin","premium"]), productsController.createProduct);

//PUT 
router.put("/:pid", authMiddleware, roleMiddleware(["admin"]), productsController.updateProduct);

//DELETE
//ruta prueba 
router.delete("/:pid", productsController.deleteProduct);

//ruta posta 
//router.delete("/:pid", authMiddleware, roleMiddleware(["admin","premium"]), productsController.deleteProduct);

//Regex 
router.param("pId", (req, res, next, cId) => {
    const regex = /^[a-fA-F0-9]{24}$/;
    if (!regex.test(cId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    next();
});

export default router