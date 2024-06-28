import CustomeError from "../errors/custome-error.js";
import { cartsService } from "../services/carts.service.js";

class CartsController {
    findAllCarts = async (req, res) => {
        try {
            const result = await cartsService.findAll();
            res.status(200).json({ carts: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    findCartById = async (req, res) => {
        try {
            const { cId } = req.params;

            const result = await cartsService.findById( cId );
            res.status(200).json({ cart: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    createCart = async (req, res) => {
        try {
            const result = await cartsService.createCart({});

            res.status(200).json({ message: "Cart created", cart: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    addProductCart = async (req, res) => {
        try {
            const { cId, pId } = req.params;

            const result = await cartsService.addProductCart(cId, pId, req.user);
            
            res.status(200).json({ message: "Product added to cart", cart: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const { cId, pId } = req.params;
            const { quantity } = req.body;

            const result = await cartsService.updateProduct(cId, pId, quantity);
            
            res.status(200).json({ message: "Product quantity updated!", cart: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    deleteAllProductsFromCart = async (req, res) => {
        try {
            const { cId } = req.params;
            await cartsService.deleteAllProductsFromCart( cId );
            return res.status(200).json({ message: "Products delete from carts" });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    deleteProductFromCart = async (req, res) => {
        try {
            const { cId, pId } = req.params;

            await cartsService.deleteProductFromCart(cId, pId);
           
            return res.status(200).json({ message: "Product successfully removed!"});
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    processPurchase = async (req, res) => {
        try {
            const { cId } = req.params;
            const user  = req.user;

            const result = await cartsService.processPurchase(cId , user);
            return res.status(200).json({ message: "Purchase made successfully!", result: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }
}

export const cartsController = new CartsController();

