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
    async createOne(obj,email){
        const object = {...obj, email}
        const response = await productsManager.createOne(object);
        return response;
    }
    async updateOne(id,obj){
        const response = await productsManager.updateOne(id, obj);
        return response;
    }
    async deleteOne(pid,user){
        const product = await productsManager.findById(pid);
        if (!product) CustomeError.createError( ErrorMessages.PRODUCT_NOT_FOUND);
        if((user.role == "owner" && product.owner == user.email) || user.role == "admin") {
            const response = await productsManager.deleteOne(pid);
            return response;
        }
        else {
            CustomeError.createError( ErrorMessages.DELETE_PRODUCT_ERROR);
        }
    }

    async updateMany(obj){
        const response = await productsManager.updateMany({}, obj);
        return response;
    }

    async bulkWrite(obj){
        const response = await productsManager.bulkWrite(obj);
        return response;
    }

    async generateProducts(){
        const response = generateProducts();
        return response;
    }
}

export const productsService = new ProductsService();
