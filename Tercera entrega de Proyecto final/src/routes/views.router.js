import { Router } from 'express'
import { viewsController } from '../controllers/views.controller.js';

const router = Router()

//SIGNUP
router.get('/signup', viewsController.signUp);

//LOGIN
router.get('/login', viewsController.login);

//HOME
router.get('/home', viewsController.home);
 
//PRODUCTS
router.get("/products", viewsController.products);

//CREATE PRODUCT
router.get('/createproduct', viewsController.createProduct);

//CHAT
router.get('/chat', viewsController.chat);

//ERROR 
router.get('/error', viewsController.error);

//CARTS
router.get("/carts/:cid", viewsController.carts);

export default router;

