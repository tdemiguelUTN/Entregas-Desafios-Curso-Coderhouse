import { productsService } from "../services/products.service"

class ProductsController {
    findAllProducts = async (req, res) => {
        try {
            const result = await productsService.findAll(req.query);
            res.status(200).json({ products: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createProduct = async (req, res) => {
        try {
            const { name, price, stock } = req.body;
            if (!name || !price || !stock) {
                return res.status(400).json({ message: "All the fields are required" })
            }
            const result = await productsService.createOne(req.body);
            res.status(200).json({ message: "Product created", products: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const {id, ...obj} = req.body;
            if (!obj) {
                return res.status(400).json({ message: "All the fields are required" })
            }
            const result = await productsService.updateOne(id,obj);
            res.status(200).json({ message: "Product update", product: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    deleteProduct = async (req, res) => {
        try {
            const result = await productsService.deleteOne(id);
            return res.status(200).json({ message: "Product delete", result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export const productsController = new ProductsController();

