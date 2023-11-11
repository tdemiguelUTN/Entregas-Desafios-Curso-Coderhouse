import { Router } from 'express'
import { usersManager } from "../managers/UsersManager.js";
import { productsManager } from "../managers/ProductsManager.js";
import { cartsManager } from "../managers/CartsManager.js"

const router = Router()

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/products", async (req, res) => {
  try {
    const obj = req.query;
    const products = await productsManager.findAllProducts(obj);
    const carts = await cartsManager.findAll(obj);
    res.render("products", { products: products.payload, carts: carts[0] });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});

router.get("/createproduct", (req, res) => {
  res.render("createProduct");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.findById(cid);
    console.log("Cart data:", cart); // Añadir este log para verificar los datos del carrito
    console.log("Products data:", cart.products); // Añadir este log para verificar los datos de los productos
    res.render("cart", { id: cart._id, products: cart.products });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});

router.get("/home/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const userInfo = await usersManager.findById(idUser);
    const { first_name, last_name } = userInfo;
    const products = await productsManager.findAll();
    res.render("home", { first_name, last_name, products });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});


export default router;

