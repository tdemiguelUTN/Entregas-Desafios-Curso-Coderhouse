import { usersManager } from "../persistencia/DAOs/mongoDAO//UsersManager.js"
import { cartsService } from "../services/carts.service.js"
import { hashData, mailToUser, urlRecoveryPassword, compareData } from "../utils.js"
import UserDTO from "../persistencia/DTOs/user.dto.js";

import CustomeError from "../errors/custome-error.js";
import { ErrorMessages } from "../errors/error.enum.js";

class UsersService {
    async findAll() {
        const response = await usersManager.findAll();
        if (!response) throw new CustomeError(ErrorMessages.USERS_NOT_FOUND, 404);
        return response;
    }

    async findById(id) {
        const user = await usersManager.findById(id);
        if (!user) throw new CustomeError(ErrorMessages.USER_NOT_FOUND, 404);

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
        //COLOCAR UN ERROR
        return user;
    }

    async changeRole(uid) {
        const requiredDocuments = [
            { name: "Identificación", type: "documents" },
            { name: "Comprobante de domicilio", type: "documents" },
            { name: "Comprobante de estado de cuenta", type: "documents" }
        ];

        const user = await usersManager.findById(uid);
        if (!user) throw new CustomeError(ErrorMessages.USER_NOT_FOUND, 404);

        const hasDocumentsRequired = requiredDocuments.every(requiredDoc =>
            user.documents.some(doc =>
                doc.type === requiredDoc.type &&
                doc.name.includes(requiredDoc.name) &&
                doc.status.uploaded === true
            )
        );

        if (!hasDocumentsRequired && user.role !== "premium") throw new CustomeError(ErrorMessages.DOCUMENTS_VERIFICATION_IDENTITY, 400);

         const newRole = user.role === "client" ? "premium" : "client";

        const response = await usersManager.updateOne(user._id, { $set: { role: newRole } });
        if (response.acknowledged == false) throw new CustomeError(ErrorMessages.DOCUMENTS_NOT_ADDED, 400);

        return response;
    }

    async updateOne(id, obj) {
        const user = await usersManager.updateOne(id, obj);
        if (!user) throw new CustomeError(ErrorMessages.USERS_NOT_FOUND, 404);

        const response = new UserDTO(user);
        return response;
    }

    async deleteOne(id) {
        const response = await usersManager.deleteOne(id);
        //FALTA COLOCAR ERROR
        return response;
    }

    async findByEmail(email, passport = false) {
        const user = await usersManager.findByEmail(email);
        if (passport) return user;

        if (!user) throw new CustomeError(ErrorMessages.USER_NOT_FOUND, 404);

        const response = new UserDTO(user);
        return response;
    }

    async signUpUserPassport(req, email, password, done) {

        const userDB = await usersService.findByEmail(email, true);

        if (userDB) { return done(null, false); }

        const userCreate = await usersService.createOne(req.body);
        return done(null, userCreate);
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

        await usersService.lastConnection(user);
        return done(null, user);
    }

    async forgotPassword(email) {
        await urlRecoveryPassword(email);
    }

    async resetUserPassword(email, password) {
        const user = await usersManager.findByEmail(email);
        if (!user) throw new CustomeError(ErrorMessages.USER_NOT_FOUND, 404);

        if (await compareData(password, user.password)) throw new CustomeError(ErrorMessages.RESET_PASSWORD_ERROR, 400);

        const hashedPassword = await hashData(password);

        await usersManager.updateOne(user._id, { hashedPassword });
    }

    async addDocuments(id, newDocuments) {
        const user = await usersService.findById(id);
        if (!user) throw new CustomeError(ErrorMessages.USER_NOT_FOUND, 404);

        user.documents = user.documents.concat(newDocuments);
        const update = { $set: { documents: user.documents } };

        const response = await usersManager.updateOne(user._id, update);

        if (response.acknowledged == false) throw new CustomeError(ErrorMessages.DOCUMENTS_NOT_ADDED, 400);
    }

    async lastConnection(userId) {

        const user = await usersManager.findById(userId);
        const response = await usersManager.updateOne(user._id, { last_connection: new Date() });

        return response;
    }
}

export const usersService = new UsersService();