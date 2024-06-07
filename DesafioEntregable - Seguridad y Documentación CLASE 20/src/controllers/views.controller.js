import { productsService } from "../services/products.service.js";
import { cartsService } from "../services/carts.service.js";
import { verifyToken } from "../utils.js";

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
            const { full_name , email } = req.user;
            res.render("home", { full_name, email });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    homeAdmin = async (req, res) => {
        try {
            const { full_name , email } = req.user;
            res.render("homeAdmin", { full_name, email });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    products = async (req, res) => {
        try {
            const cartId = req.user.cart._id;
            const obj = req.query;
            const products = await productsService.findAll(obj);
            res.render("products", { products: products.payload, cartId: cartId });
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

    forgotPassword = async (req, res) => {
        try {
            res.render("forgotPassword");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    resetPassword = async (req, res) => {
        try {
            const { token } = req.params;
            verifyToken(token);
            res.render("resetPassword",{token});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}

export const viewsController = new ViewsController();