import { Router } from 'express'
import { viewsController } from '../controllers/views.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router()

//SIGNUP
router.get('/signup', viewsController.signUp);

//LOGIN
router.get('/login', viewsController.login);

//HOME
router.get('/home', authMiddleware, viewsController.home);
router.get('/homeAdmin', authMiddleware, viewsController.homeAdmin);
 
//PRODUCTS
router.get("/products", authMiddleware, viewsController.products);

//CREATE PRODUCT
router.get('/createproduct', authMiddleware, viewsController.createProduct);

//CHAT
router.get('/chat', authMiddleware, viewsController.chat);

//ERROR 
router.get('/error', viewsController.error);

//CARTS
router.get("/carts/:cid", authMiddleware, viewsController.carts);

//PASSWORD
router.get("/forgotPassword", viewsController.forgotPassword);
router.get("/resetPassword/:token", viewsController.resetPassword);

//CONFIG PROFILE
router.get("/profile", authMiddleware, viewsController.profile);

export default router;

