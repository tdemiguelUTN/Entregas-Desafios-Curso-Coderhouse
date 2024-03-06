import { cartsModel } from "../../db/models/carts.model.js";
import BasicManager from "../mongoDAO/BasicManager.js";

class CartsManager extends BasicManager {
    constructor() {
        super(cartsModel, "products.product");
    }
    async addProductCart(cart, product) {
        try {
            const productExist = cart.products.find(e => e.product._id == product._id);
            if (productExist) {
                productExist.quantity += 1;
            } else {
                cart.products.push({
                    product,
                    quantity: 1,
                });
            }
            cart.save();                                                    // Guarda el cart actualizado en la base de datos
            return cart;
        } catch (error) {
            return error;
        }
    }

    async updateProduct(cart, updateProduct, quantity) {
        try {
            updateProduct.quantity = quantity;
            cart.save();
            return cart;
        } catch (error) {
            return error;
        }
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
        try {
            finalCart.save();
            return finalCart;
        } catch (error) {
            return error
        }
    }
}

export const cartsManager = new CartsManager();
