import { usersManager } from "../persistencia/DAOs/mongoDAO//UsersManager.js"
import { cartsService } from "../services/carts.service.js"
import { hashData } from "../utils.js"

class usersService {
    async findAll() {
        const response = await usersManager.findAll();
        return response;
    }
    async findById(id) {
        const response = await usersManager.findById(id);
        return response;
    }

    async createOne(obj) {
        const { password, ...obj } = req.body;
        const hashedPassword = hashData(password);
        const createdCart = await cartsService.createOne();
        const response = await usersManager.createOne({
            ...obj,
            password: hashedPassword,
            cart: createdCart._id
        });
        return response;
    }

    async updateOne(id, obj) {
        const response = await usersManager.updateOne(id, obj);
        return response;
    }
    async deleteOne(id) {
        const response = await usersManager.deleteOne(id);
        return response;
    }
    async findByEmail(email) {
        const response = await usersManager.findByEmail(email);
        return response;
    }
}

export const usersService = new usersService();