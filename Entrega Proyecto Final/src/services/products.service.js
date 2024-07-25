import { productsManager } from "../persistencia/DAOs/mongoDAO/ProductsManager.js"
import { generateProducts } from "../utils.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

class ProductsService {
    async findAll(obj) {
        const response = await productsManager.findAll(obj);
        if (response.payload == null) throw new CustomeError(ErrorMessages.PRODUCTS_NOT_FOUND, 404);
        return response;
    }

    async findById(id) {
        const response = await productsManager.findById(id);
        if (!response) throw new CustomeError(ErrorMessages.PRODUCT_NOT_FOUND, 404);
        return response;
    }

    async createOneProduct(body, email) {
        const { name, price } = body;

        if (!name || !price) {
            throw new CustomeError(ErrorMessages.FIELDS_REQUIERED, 400)
        }
        
        const object = { ...body, 
            owner: {
                email: email,
            }
         }

        const response = await productsManager.createOne(object);
        return response;
    }

    async updateOne(id, obj) {
        const response = await productsManager.updateOne(id, obj);
        if (!response) throw new CustomeError(ErrorMessages.PRODUCT_NOT_FOUND, 404);

        return response;
    }

    async deleteOne(pid, userRole, email) {
        const product = await productsManager.findById(pid);
        console.log("product:", product);

        if (!product) throw new CustomeError(ErrorMessages.PRODUCT_NOT_FOUND, 404);

        if ((!userRole == "premium" && product.owner.email == email) || !userRole == "admin") {
            throw new CustomeError(ErrorMessages.UNAUTHORIZED, 401);
        }
        await productsManager.deleteOne(pid);
    }

    async bulkWrite(obj) {
        await productsManager.bulkWrite(obj);
    }

    async generateProducts() {
        const response = generateProducts();
        return response;
    }
}

export const productsService = new ProductsService();
