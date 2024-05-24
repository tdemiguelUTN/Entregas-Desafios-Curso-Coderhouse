import { usersManager } from "../persistencia/DAOs/mongoDAO//UsersManager.js"
import { cartsService } from "../services/carts.service.js"
import { hashData, mailToUser, urlRecoveryPassword, compareData } from "../utils.js"
import UserDTO from "../persistencia/DTOs/user.dto.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";


class UsersService {
    async findAll() {
        const response = await usersManager.findAll();
        if (!response) CustomeError.createError(ErrorMessages.USERS_NOT_FOUND)
        return response;
    }

    async findById(id) {
        const user = await usersManager.findById(id);

        if (!user) CustomeError.createError(ErrorMessages.USER_NOT_FOUND)
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

        if (user.role == "client") user.role == "premium";
        if (user.role == "premium") user.role == "client";

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

    async loginUserPassport(email, password, done) {
        const user = await usersManager.findByEmail(email);

        if (!user) {
            return done(null, false);
        }

        const isValid = await compareData(password, user.password);

        if (!isValid) {
            return done(null, false);
        }

        return done(null, user);
    }

    async forgotPassword(email) {
        await urlRecoveryPassword(email);

    }

    async resetUserPassword(email, password) {
        const user = await usersManager.findByEmail(email);

        if (!user) return null;

        if (await compareData(password, user.password)) CustomeError.createError(ErrorMessages.RESET_PASSWORD_ERROR);

        const hashedPassword = await hashData(password);

        await usersManager.updateOne(user._id, { hashedPassword });
    }
}

export const usersService = new UsersService();