import { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from './utils/nodemailer.js';
import { v4 as uuidv4 } from 'uuid';
import { generateProduct } from './utils/faker.js';

//hash de contraseñas
export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash;
}
export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData);
}

//json web token 
export const generateToken =  (email) => {
    const token =  jwt.sign({email}, config.jwt_secret_key, { expiresIn: "1h" });
    return token;
};

//verify token
export const verifyToken = (token) => {
        jwt.verify(token,config.jwt_secret_key,function(err, decoded){
            if (err) throw new Error (err);
            return decoded
        });
};

//mail para nuevo usuario - nodemailer
export const mailToUser = async (user, typeOfMail, infoTicket = {}) => {
    let options;
    switch (typeOfMail) {
        case "register":
            options = {
                from: config.gmail_user,
                to: user.email,
                subject: "Welcome to our platform!",
                text: `Welcome ${user.full_name}`,
            }
        case "buy":
            options = {
                from: config.gmail_user,
                to: user.email,
                subject: "Your purchase was made successfully!",
                text: `Hello ${user.full_name}.\n\n` +
                    `Here is your receipt: \n\n` +
                    `Purchase code: ${infoTicket.code}\n` +
                    `Total amount: ${infoTicket.amount}\n` +
                    `Purchase date: ${infoTicket.purchase_datetime}\n` +
                    `Products: \n\n\t${infoTicket.products.map(ticketItem =>
                        `Descripcion: ${ticketItem.product.name} - Cantidad: ${ticketItem.quantity}`).join('\n')}\n\n` +
                    `In a couple of days you will receive more updates about your order!\n\n`
            }
        case "error":
            options = {
                from: config.gmail_user,
                to: user.email,
                subject: "Purchase Error",
                text: `Hello, ${user.full_name}. \n\n` +
                    `An error has been produced when your purchase was processing.\n` +
                    `Please, try again\n\n` +
                    `Kindest regards.`
            }

            await transporter.sendMail(options);
            return;
    }
};


//mail para recuperacion de contraseña 
export const urlRecoveryPassword = async (email) => {
    const token = generateToken(email); 
    const resetPasswordURL = `http://localhost:8080/resetPassword/${token}`;
    const options = {
        from: config.gmail_user,
        to: email,
        subject: "Change your password",
        text: `You recently requested to reset the password for your account. Click the link below to reset your password:\n` +
        `${resetPasswordURL}\n` +
        `A cordial greeting`
};
    await transporter.sendMail(options);
    return;
};


//ruta absoluta
export const __dirname = dirname(fileURLToPath(import.meta.url));

//generate Unique Identifier
export const generateUniqueId = () => {
    return uuidv4();
};

//genera 100 productos randoms
export const generateProducts = () => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = generateProduct();
        products.push(product);
    }
    return products;
};
