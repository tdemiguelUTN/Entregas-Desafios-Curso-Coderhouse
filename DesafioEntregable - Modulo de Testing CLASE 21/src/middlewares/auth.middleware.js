export const authMiddleware = (req, res, next) => {
    if (!req.session && !req.session.passport) {
        return res.status(403).json({ message: "Not authorized" });
    }
    next();
};  