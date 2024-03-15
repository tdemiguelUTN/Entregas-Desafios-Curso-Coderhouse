import { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from './utils/nodemailer.js';
import { v4 as uuidv4 } from 'uuid';

//hash de contraseñas
export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash;
}
export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData);
}

//json web token 
export const generateToken = (user) => {
    const token = jwt.sign(user, config.jwt_secret_key, { expiresIn: 300 });
    return token;
};

//mail para nuevo usuario - nodemailer
export const mailToUser = async (user, typeOfMail, infoTicket = {}) => {
    if (typeOfMail == "register") {
        const options = {
            from: config.gmail_user,
            to: user.email,
            subject: "Welcome to our platform!",
            text: `Welcome ${user.full_name}`,
        }
        await transporter.sendMail(options);
        return;
    }
    if (typeOfMail == "buy") {
        const options = {
            from: config.gmail_user,
            to: user.email,
            subject: "Your purchase was made successfully!",
            text:   `Hello ${user.full_name}.\n\n` +
                    `Here is your receipt: \n\n ` +
                    `Purchase code: ${infoTicket.code}\n` +
                    `Total amount: ${infoTicket.amount}`
                    `Purchase date: ${infoTicket.purchase_datetime}\n` +
                    `Products: \n\n\t${infoTicket.products.forEach(ticketItem =>
                        `${ticketItem.product.name}  - ${ticketItem.quantity}\n`)
                    }`
                    `In a couple of days you will receive more updates about your order!\n\n`,
        }
        console.log(options);
        await transporter.sendMail(options);
        return;
    }
};

//ruta absoluta
export const __dirname = dirname(fileURLToPath(import.meta.url));

//generate Unique Identifier
export const generateUniqueId = () => {
    return uuidv4();
};
