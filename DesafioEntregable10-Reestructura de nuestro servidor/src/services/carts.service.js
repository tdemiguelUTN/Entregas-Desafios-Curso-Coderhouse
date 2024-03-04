import {cartsManager} from "../persistencia/DAOs/mongoDAO/CartsManager.js"
import {productsService} from "./products.service.js"

class CartsService{ 
    async findAll() {
        const response = await cartsManager.findAll();
        if(response == null) {
            throw new Error()
        }
        return response;
    }

    async findById(cId){
        const response = await cartsManager.findById(cId);
        if(response == null) {
            throw new Error()
        }
        return response;
    }

    async createCart(obj){
        const response = await cartsManager.createOne(obj);
        return response;
    }

    async addProductCart(idCart, idProduct){
        const cart = await cartsManager.findById(idCart);
        const product = await productsService.findById(idProduct);

        if (!cart) throw new Error()
        if (!product) throw new Error()

        const response = await cartsManager.addProductCart(cart, product);
        return response;
    }

    async updateProduct(idCart, idProduct, quantity){
        const cart = await cartsManager.findById(idCart);
        const product = await productsService.findById(idProduct);

        if (!cart) throw new Error()
        if (!product) throw new Error()

        const productToUpdate = cart.products.find(product => product._id == idProduct);

        if (!productToUpdate) throw new Error()

        const response = await cartsManager.updateProduct(cart, productToUpdate, quantity);
        return response
    }

    async deleteAllProductsFromCart(idCart){
        const cart = await cartsManager.findById(idCart)
        if(cart == null) {
            throw new Error()
        }
        const response = await cartsManager.deleteAllProducts(cart);
        return response;
    }

    async deleteProductFromCart(idCart, idProduct){
        const cart = await cartsManager.findById(idCart);
        const product = await productsService.findById(idProduct);

        if (!cart) throw new Error();
        if (!product) throw new Error();

        const finalCart = cart.products.filter(product => product._id !== idProduct);

        if (!finalCart) throw new Error();

        const response = await cartsManager.deleteProductFromCart(finalCart);
        return response;
    }


}

export const cartsService = new CartsService();


