import {productsManager} from "../persistencia/DAOs/mongoDAO/ProductsManager.js"
import { generateProducts } from "../utils.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

class ProductsService{ 
    async findAll(obj) {
        const response = await productsManager.findAll(obj);
        if (response == null) {
            CustomeError.createError (ErrorMessages.PRODUCTS_NOT_FOUND);
        }
        return response;
    }
    async findById(id) {
        const response = await productsManager.findById(id);
        if (!response) CustomeError.createError( ErrorMessages.PRODUCT_NOT_FOUND);
        return response;
    }
    async createOne(obj){
        const response = await productsManager.createOne(obj);
        return response;
    }
    async updateOne(id,obj){
        const response = await productsManager.updateOne(id, obj);
        return response;
    }
    async deleteOne(id){
        const response = await productsManager.deleteOne(id);
        return response;
    }

    async generateProducts(){
        const response = generateProducts();
        return response;
    }
}

export const productsService = new ProductsService();
