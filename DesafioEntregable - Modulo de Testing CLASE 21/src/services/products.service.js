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

    async createOne(body, email) {
        const { name, price } = req.body;
        if (!name || !price) {
            throw new CustomeError(ErrorMessages.FIELDS_REQUIERED, 400)
        }

        const object = { ...body, email }
        const response = await productsManager.createOne(object);

        return response;
    }

    async updateOne(id, obj) {
        const response = await productsManager.updateOne(id, obj);
        if (!response) throw new CustomeError(ErrorMessages.PRODUCT_NOT_FOUND, 404);

        return response;
    }

    async deleteOne(pid, user) {
        const product = await productsManager.findById(pid);
        if (!product) throw new CustomeError(ErrorMessages.PRODUCT_NOT_FOUND, 404);

        if ((user.role == "owner" && product.owner == user.email) || user.role == "admin") {
            const response = await productsManager.deleteOne(pid);
            return response;
        }
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
