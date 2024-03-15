import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

//GET
router.get('/', cartsController.findAllCarts);
router.get("/:cId", cartsController.findCartById);

//POST
router.post("/", cartsController.createCart);  
router.post("/:cId/product/:pId",roleMiddleware("client"), cartsController.addProductCart);  // agregar sistema de errores (producto no encontrado, carrito no encontrado)
router.post("/:cId/purchase", cartsController.processPurchase);

//PUT
router.put("/:cId/products/:pId", cartsController.updateProduct);    // agregar sistema de errores "no existe ese carrito para actualizar la cantidad de ejemplares del producto" y "no existe ese producto para actualizar su cantidad"

//DELETE
router.delete('/:cId', cartsController.deleteAllProductsFromCart);              //agregar sistema de errores (producto no encontrado, carrito no encontrado,ver lo del array de products del carrito)
router.delete("/:cId/products/:pId", cartsController.deleteProductFromCart);    //agregar sistema de errores (producto no encontrado, carrito no encontrado)

export default router