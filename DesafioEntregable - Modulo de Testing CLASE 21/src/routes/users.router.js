import { Router } from 'express'
import { usersController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

//GET
router.get('/', authMiddleware, usersController.findAllUser)
router.get("/:idUser", authMiddleware, usersController.findUserById);
router.get("/email/:email", authMiddleware, usersController.findByEmail);

//POST
router.post("/", usersController.createUser);
router.post("/premium/:uid", authMiddleware, usersController.changeRole);
router.post("/forgotPassword", usersController.forgotPassword);
router.post("/resetPassword/:token", usersController.resetPassword);

//PUT
router.put("/changeRole", authMiddleware, usersController.changeRole);


//DELETE
router.delete("/:idUser", authMiddleware, usersController.deleteUser);

export default router;