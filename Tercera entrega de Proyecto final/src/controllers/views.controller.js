import { productsService } from "../services/products.service.js";
import { cartsService } from "../services/carts.service.js";

class ViewsController {

    signUp = async (req, res) => {
        try {
            res.render("signup");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    login = async (req, res) => {
        try {
            res.render("login");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    home = async (req, res) => {
        try {
            const { first_name, last_name, email } = req.user;
            res.render("home", { first_name, last_name, email });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    products = async (req, res) => {
        try {
            res.locals.first_name = req.user.first_name
            res.locals.last_name  = req.user.last_name
            res.locals.email = req.user.email
            
            const obj = req.query;
            const products = await productsService.findAll(obj);
            const cartId = req.user.cart._id;
            res.render("products", { products: products.payload, cartId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createProduct = async (req, res) => {
        try {
            res.render("createProduct");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    chat = async (req, res) => {
        try {
            res.render("chat");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    error = async (req, res) => {
        try {
            res.render("error");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    carts = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartsService.findById(cid);
            const products = cart.products
            res.render("cart", { 
                id: cart._id, 
                products: products 
              });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}

export const viewsController = new ViewsController();