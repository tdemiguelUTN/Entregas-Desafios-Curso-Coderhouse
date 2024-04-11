import { usersManager } from "../persistencia/DAOs/mongoDAO//UsersManager.js"
import { cartsService } from "../services/carts.service.js"
import { hashData, mailToUser, urlRecoveryPassword } from "../utils.js"
import UserDTO from "../persistencia/DTOs/user.dto.js";
import resetUserPasswordDTO from "../persistencia/DTOs/resetPassword.dto.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";


class UsersService {
    async findAll() {
        const response = await usersManager.findAll();
        if(!response) CustomeError.createError(ErrorMessages.USERS_NOT_FOUND)
        return response;
    }
    
    async findById(id) {
        const user = await usersManager.findById(id);
        if(!user) CustomeError.createError(ErrorMessages.USER_NOT_FOUND)
        const response = new UserDTO(user);
        return response;
    }

    async createOne(body) {
        const { password, ...obj } = body;
        const hashedPassword = await hashData(password);
        const createdCart = await cartsService.createCart({});
        const userToDTO = await usersManager.createOne({
            ...obj,
            password: hashedPassword,
            cart: createdCart._id
        });
        const user = new UserDTO(userToDTO);
        const typeOfMail = "register";
        await mailToUser(user, typeOfMail);
        return user;
    }

    async changeRole(uid) {

        const user = await usersManager.findById(uid);
        if (!user) CustomeError.createError(ErrorMessages.USER_NOT_FOUND);

        if(user.role == "client") user.role == "premium";
        if(user.role == "premium") user.role == "client";

        const response = await usersManager.updateOne(user._id, user);
        
        if (!user) CustomeError.createError(ErrorMessages.USERS_NOT_FOUND);
        return response;
    }

    async updateOne(id, obj) {
        const user = await usersManager.updateOne(id, obj);
        if (!user) CustomeError.createError(ErrorMessages.USERS_NOT_FOUND);
        const response = new UserDTO(user);
        return response;
    }

    async deleteOne(id) {
        const response = await usersManager.deleteOne(id);
        return response;
    }

    async findByEmail(email) {                                  
        const user = await usersManager.findByEmail(email);
        if (!user) return null;
        const response = new UserDTO(user);
        return response;
    }

    async forgotPassword(email) {                                  
        await urlRecoveryPassword(email);
        return;
    }

    async resetUserPassword(email) {                                  
        const user = await usersManager.findByEmail(email);
        if (!user) return null;
        const response = new resetUserPasswordDTO(user);
        return response;
    }
}

export const usersService = new UsersService();