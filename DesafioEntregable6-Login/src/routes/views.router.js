import { Router } from 'express'
import { usersManager } from "../managers/UsersManager.js";
import { productsManager } from "../managers/ProductsManager.js";
import { cartsManager } from "../managers/CartsManager.js"

const router = Router()

//USERS-LOGIN-SIGNUP
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
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

//PRODUCTS
router.get("/products", async (req, res) => {
  try {
    const obj = req.query;
    const products = await productsManager.findAllProducts(obj);
    console.log(req.session)
    const cartId = req.session.cart;
    return res.render("products", { products: products.payload, cartId });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});

router.get("/createproduct", (req, res) => {
  res.render("createProduct");
});

//CHAT
router.get("/chat", (req, res) => {
  res.render("chat");
});

//CARTS
router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.findById(cid);
    const products = cart.products
    res.render("cart", { 
      id: cart._id, 
      products: products 
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});

export default router;

