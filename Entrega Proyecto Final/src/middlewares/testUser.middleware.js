// Middleware para simular req.user durante las pruebas
const mockUserMiddleware = (role, email) => {
    return (req, res, next) => {
      req.user = { role, email }; // Establece el rol y el email deseado
      next();
    };
  };
  
  export { mockUserMiddleware };
  