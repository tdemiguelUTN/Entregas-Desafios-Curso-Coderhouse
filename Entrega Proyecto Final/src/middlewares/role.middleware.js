export const roleMiddleware = (roleArray) => {
  return (req, res, next) => {
    if (!req.user || !roleArray.includes(req.user.role )) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
};

//utiliza concepto closure