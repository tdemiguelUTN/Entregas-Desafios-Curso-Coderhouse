import { cartsModel } from "../dao/db/models/carts.model.js";
import { productsManager } from "./ProductsManager.js"
import BasicManager from "../managers/BasicManager.js";

class CartsManager extends BasicManager {
    constructor() {
        super(cartsModel);
    }

    async deleteCart(idCart) {
        try {
            const cart = await this.findById(idCart);
            if (!cart.products.length) return cart;
            cart.products = [];
            return cart;
        } catch (error) {
            return error
        }
    }

    async deleteProduct(idCart, idProduct) {
        try {
            const cart = await this.findById(idCart)
            if (!cart) return -2
            const updateCart = cart.products.filter(product => idProduct !== product._id);
            if (!updateCart.length) return -1
            cart.save();
            return cart;
        } catch (error) {
            return error
        }
    }

    async addProductCart(idCart, idProduct) {
        try {
            const cart = await cartsManager.findById(idCart);               // Obtén el cart por su ID desde la base de datos
            if (!cart) return -1
            const product = await productsManager.findById(idProduct);      // Obtén el producto por su ID desde la base de datos
            if (!product) return -2
            const productExist = cart.products.find(e => e.product._id == idProduct);
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

    async updateCarrito(idCart, idProduct, quantity) {
        try {
            const cart = await this.findById(idCart);
            if (!cart) return -2
            const updateProduct = cart.products.find(idProduct);
            if (!updateProduct) return -1
            updateProduct.quantity = quantity;
            cart.save();
            return cart;
        } catch (error) {
            return error;
        }
    }
}

export const cartsManager = new CartsManager();
