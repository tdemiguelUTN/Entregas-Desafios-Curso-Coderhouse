import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//hash de contraseñas
export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash;
}
export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData);
}

//json web token 
const JWT_SECRET = "jwtSECRET";     //ejemplo 
export const generateToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: 300 });
    return token;
  };

//ruta absoluta
export const __dirname = dirname(fileURLToPath(import.meta.url));