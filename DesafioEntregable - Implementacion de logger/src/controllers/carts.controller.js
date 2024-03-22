import { cartsService } from "../services/carts.service.js";

class CartsController {
    findAllCarts = async (req, res) => {
        try {
            const result = await cartsService.findAll();
            res.status(200).json({ users: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    findCartById = async (req, res) => {
        const { cId } = req.params;
        try {
            const result = await cartsService.findById(cId);
            res.status(200).json({ cart: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createCart = async (req, res) => {
        try {
            const result = await cartsService.createCart({});
            res.status(200).json({ message: "Cart created", cart: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    addProductCart = async (req, res) => {
        try {
            const { cId, pId } = req.params;
            const result = await cartsService.addProductCart(cId, pId);
            res.status(200).json({ message: "Product added to cart", cart: result });
        } catch (error) {
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
            res.status(500).json({ message: error.message });

        }
    }

    deleteAllProductsFromCart = async (req, res) => {
        try {
            const { cId } = req.params;
            const result = await cartsService.deleteAllProductsFromCart(cId);
            return res.status(200).json({ message: "Products delete from carts", result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    deleteProductFromCart = async (req, res) => {
        try {
            const { cId, pId } = req.params;
            const result = await cartsService.deleteProductFromCart(cId, pId);
            return res.status(200).json({ message: "Product successfully removed!", result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    processPurchase = async (req, res) => {
        try {
            const { cId } = req.params;
            const user  = req.user;

            const result = await cartsService.processPurchase(cId , user);
            return res.status(200).json({ message: "Purchase made successfully!", result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const cartsController = new CartsController();



