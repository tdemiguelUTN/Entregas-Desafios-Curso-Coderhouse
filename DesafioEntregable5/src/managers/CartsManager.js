import { cartsModel } from "../dao/db/models/carts.model.js";
import { productsModel } from "../dao/db/models/products.model.js"
import BasicManager from "../managers/BasicManager.js";

class CartsManager extends BasicManager {
    constructor(){
        super(cartsModel);
    }

    async addProductCarrito(cId, pId) {
        try {
            // Obtén el carrito por su ID desde la base de datos
            const carrito = await this.model.findOne({ id: cId });

            if (!carrito) {
                return -2; // El carrito no existe
            }

            // Obtén el producto por su ID desde la base de datos
            const producto = await productModel.findOne({ id: pId });

            if (!producto) {
                return -1; // El producto no existe
            }

            // Busca el producto en el carrito
            const productExist = carrito.productos.find((productoCarrito) => productoCarrito.id === pId);

            if (productExist) {
                productExist.quantity += 1;
            } else {
                carrito.productos.push({
                    id: pId,
                    quantity: 1,
                });
            }

            // Guarda el carrito actualizado en la base de datos
            await carrito.save();

            return "Producto añadido correctamente al carrito";
        } catch (error) {
            return error;
        }
    }
}

export const cartsManager = new CartsManager();
