import { Router } from 'express'
import { usersController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../utils/multer.js';

const router = Router();

//GET
router.get("/", authMiddleware, usersController.findAllUser);
router.get("/:idUser", authMiddleware, usersController.findUserById);
router.get("/email/:email", authMiddleware, usersController.findByEmail);

//POST
router.post("/", usersController.createUser);
router.post("/premium/:uid", authMiddleware, usersController.changeRole);
router.post("/forgotPassword", usersController.forgotPassword);
router.post("/resetPassword/:token", usersController.resetPassword);
router.post("/:uid/documents", upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'products', maxCount: 8 }, { name: 'documents', maxCount: 3}]), usersController.addDocuments);

//DELETE
router.delete("/:idUser", authMiddleware, usersController.deleteUser);
router.delete("/", authMiddleware, usersController.deleteAllInactiveUsers);

export default router;