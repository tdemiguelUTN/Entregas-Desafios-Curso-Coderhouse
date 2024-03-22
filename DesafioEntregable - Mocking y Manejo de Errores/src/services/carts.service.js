import { cartsManager } from "../persistencia/DAOs/mongoDAO/CartsManager.js";
import { productsService } from "./products.service.js";
import { ticketsService } from "./tickets.service.js";
import { generateUniqueId, mailToUser } from "../utils.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

class CartsService {
    async findAll() {
        const response = await cartsManager.findAll();
        if (response == null) {
            CustomeError.createError( ErrorMessages.CARTS_NOT_FOUND);
        }
        return response;
    }

    async findById(cId) {
        const response = await cartsManager.findById(cId);
        if (response == null) {
            CustomeError.createError( ErrorMessages.CART_NOT_FOUND);
        }
        return response;
    }

    async createCart(obj) {
        const response = await cartsManager.createOne(obj);
        return response;
    }

    async addProductCart(idCart, idProduct) {
        const cart = await cartsManager.findById(idCart, "products.product");
        const product = await productsService.findById(idProduct, "product");

        if (!cart) CustomeError.createError( ErrorMessages.CART_NOT_FOUND);
        if (!product) CustomeError.createError( ErrorMessages.PRODUCT_NOT_FOUND);

        const response = await cartsManager.addProductCart(cart, product);
        return response;
    }

    async updateProduct(idCart, idProduct, quantity) {
        const cart = await cartsManager.findById(idCart);
        const product = await productsService.findById(idProduct);

        if (!cart) CustomeError.createError( ErrorMessages.CART_NOT_FOUND);
        if (!product) CustomeError.createError( ErrorMessages.PRODUCT_NOT_FOUND);

        const productToUpdate = cart.products.find(product => product._id == idProduct);

        if (!productToUpdate) CustomeError.createError( ErrorMessages.PRODUCT_NOT_FOUND_IN_CART);

        const response = await cartsManager.updateProduct(cart, productToUpdate, quantity);
        return response
    }

    async deleteAllProductsFromCart(idCart) {
        const cart = await cartsManager.findById(idCart);
        if (cart == null) CustomeError.createError( ErrorMessages.CART_NOT_FOUND);

        const response = await cartsManager.deleteAllProductsFromCart(cart);
        return response;
    }

    async deleteProductFromCart(idCart, idProduct) {
        const cart = await cartsManager.findById(idCart);
        const product = await productsService.findById(idProduct);

        if (!cart) CustomeError.createError( ErrorMessages.CART_NOT_FOUND);
        if (!product) CustomeError.createError( ErrorMessages.PRODUCT_NOT_FOUND);

        const finalCart = cart.products.filter(product => product._id !== idProduct);

        if (!finalCart) throw new Error();

        const response = await cartsManager.deleteProductFromCart(finalCart);
        return response;
    }

    async processPurchase(idCart, user) {
        try {
            const cart = await cartsManager.findById(idCart);
            if (!cart) throw new Error();

            const productsToPurchase = [];
            const productsNotAvailable = [];
            let totalAmount = 0;

            const productsWithStock = cart.products.filter(e => e.product.stock > 0);

            productsWithStock.forEach(cartItem => {
                if (cartItem.quantity > cartItem.product.stock) {
                    productsNotAvailable.push(cartItem);
                } else {
                    totalAmount += cartItem.quantity * cartItem.product.price
                    productsToPurchase.push(cartItem);
                }
            });

            const updateOperations = productsToPurchase.map(purchaseItem => ({
                updateOne: {
                    filter: { _id: purchaseItem.product._id },
                    update: { $inc: { stock: -purchaseItem.quantity } }
                }
            }));

            await productsService.bulkWrite(updateOperations);

            const objTicket = {
                code: generateUniqueId(),
                amount: totalAmount,
                products: productsToPurchase,
                purchaser: user.email,
            }

            const ticket = await ticketsService.createOne(objTicket);
            let typeOfMail;
            if (productsToPurchase.length) {
                await mailToUser(user, typeOfMail = "buy", ticket);
            }

            cart.products = productsNotAvailable;
            cart.save();
            return cart;
        } catch (error) {
            await mailToUser(user, typeOfMail = "error", ticket)
            res.status(500).json({ message: error.message });
        }

    }
}

export const cartsService = new CartsService();


