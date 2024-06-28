import { productsService } from "../services/products.service.js"
import CustomeError from "../errors/custome-error.js";

class ProductsController {
    findAllProducts = async (req, res) => {
        try {
            const result = await productsService.findAll(req.query);

            res.status(200).json({ products: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    findProductById = async (req, res) => {
        try {
            const { pId } = req.params;
            const result = await productsService.findById(pId);

            res.status(200).json({ products: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    createProduct = async (req, res) => {
        try {
            const result = await productsService.createOne(req.body, req.user.email);
            
            res.status(200).json({ message: "Product created", products: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };
    
    updateProduct = async (req, res) => {
        try {
            const {id, ...obj} = req.body;
            if (!id) {
                return res.status(400).json({ message: "ID is required" })
            }
            const result = await productsService.updateOne(id, obj);
            res.status(200).json({ message: "Product updated", product: result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            await productsService.deleteOne( pid, req.user);

            return res.status(200).json({ message: "Product delete" });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };

    generateProducts = async (req, res) => {
        try {
            const result = await productsService.generateProducts();
            return res.status(200).json({ message: "Products generate", result });
        } catch (error) {
            if (error instanceof CustomeError) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    };
}

export const productsController = new ProductsController();

