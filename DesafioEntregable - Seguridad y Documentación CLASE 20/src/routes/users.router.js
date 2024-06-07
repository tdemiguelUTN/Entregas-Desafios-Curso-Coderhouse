import { Router } from 'express'
import { usersController } from '../controllers/users.controller.js';
const router = Router();

//GET
router.get('/', usersController.findAllUser)
router.get("/:idUser", usersController.findUserById);
router.get("/email/:email", usersController.findByEmail);

//POST
router.post("/", usersController.createUser);
router.post("/premium/:uid", usersController.changeRole);
router.post("/forgotPassword", usersController.forgotPassword);
router.post("/resetPassword/:token", usersController.resetPassword);

//PUT
router.put("/changeRole", usersController.changeRole);


//DELETE
router.delete("/:idUser", usersController.deleteUser);

export default router;