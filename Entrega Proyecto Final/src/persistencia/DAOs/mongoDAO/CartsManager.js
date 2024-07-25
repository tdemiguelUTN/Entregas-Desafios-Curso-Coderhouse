import { cartsModel } from "../../db/models/carts.model.js";
import BasicManager from "../mongoDAO/BasicManager.js";

class CartsManager extends BasicManager {
    constructor() {
        super(cartsModel, "products.product");
    }

    async addProductCart(cart, product) {
        const productExist = cart.products.find(e => e.product._id.equals(product._id));
        if (productExist) {
            productExist.quantity += 1;
        } else {
            cart.products.push({
                product,
                quantity: 1,
            });
        }
        cart.save();
        return cart;
    }

    async updateProduct(cart, updateProduct, quantity) {
            updateProduct.quantity = quantity;
            cart.save();
            return cart;
    }

    async deleteAllProductsFromCart(cart) {
        try {
            cart.products = [];
            cart.save();
            return cart;
        } catch (error) {
            return error
        }
    }

    async deleteProductFromCart(finalCart) {
            finalCart.save();
            return finalCart;
    }
}

export const cartsManager = new CartsManager();
