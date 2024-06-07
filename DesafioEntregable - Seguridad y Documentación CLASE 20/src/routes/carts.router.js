import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

//GET
router.get('/', cartsController.findAllCarts);
router.get("/:cId", cartsController.findCartById);

//POST
router.post("/", cartsController.createCart);  
router.post("/:cId/product/:pId",roleMiddleware("client"), cartsController.addProductCart); 
router.post("/:cId/purchase", cartsController.processPurchase);

//PUT
router.put("/:cId/products/:pId", cartsController.updateProduct); 

//DELETE
router.delete('/:cId', cartsController.deleteAllProductsFromCart);              
router.delete("/:cId/products/:pId", cartsController.deleteProductFromCart);    

//regex 
router.param("cId", (req, res, next, cId) => {
    const regex = /^[a-fA-F0-9]{24}$/;
    if (!regex.test(cId)) {
      return res.status(400).json({ message: "Invalid cart ID format" });
    }
    next();
});

export default router