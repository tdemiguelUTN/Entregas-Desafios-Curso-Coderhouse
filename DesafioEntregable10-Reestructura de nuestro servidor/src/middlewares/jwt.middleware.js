import jwt from "jsonwebtoken";
const JWT_SECRET = "jwtSECRET";     //ejemplo (es un dato sensible)

export const jwtValidation = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    const responseToken = jwt.verify(token, JWT_SECRET);
    req.user = responseToken;
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};