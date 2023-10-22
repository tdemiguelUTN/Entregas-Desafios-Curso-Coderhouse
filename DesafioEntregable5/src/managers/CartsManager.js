import { cartsModel } from "../dao/db/models/carts.model.js";
import { productsManager} from "./ProductsManager.js"
import BasicManager from "../managers/BasicManager.js";

class CartsManager extends BasicManager {
    constructor(){
        super(cartsModel);
    }
    async addProductCarrito(cId, pId) {
        try {
            const carrito = await this.model.findOne({ id: cId });          // Obtén el carrito por su ID desde la base de datos
            if(!carrito) return -1
            const producto = await productsManager.findOne({ id: pId });    // Obtén el producto por su ID desde la base de datos
            if(!producto) return -2
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
            const updateCarrito = await carrito.save();
            return updateCarrito
        } catch (error) {
            return error;
        }
    }
}

export const cartsManager = new CartsManager();
