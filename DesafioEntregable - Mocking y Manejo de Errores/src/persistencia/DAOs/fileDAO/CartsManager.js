import fs from 'fs';
import { productManager } from './ProductManager.js';

// Utiliza los objetos de errores según sea necesario

class CarritoManager {
    constructor(path) {
        this.path = path
    }

    async getCarritos() {
        try {
            if (fs.existsSync(this.path)) {
                const readFile = await fs.promises.readFile(this.path, 'utf-8')
                const carritos = JSON.parse(readFile);
                return carritos
            }
            else {
                return []
            }
        } catch (error) {
            return error
        }
    }


    async addCarrito() {
        try {
            const carritos = await this.getCarritos()
            const id = await carritos.length ? carritos[carritos.length - 1].id + 1 : 1
            const newCarrito = {
                id: id,
                productos: [],
            }
            await fs.promises.writeFile(this.path, JSON.stringify([...carritos, newCarrito])); // termino agregando el nuevo carrito creado a toda mi lista de carritos
            return "El carrito se agregó con éxito!"
        }
        catch (error) {
            return error
        }
    }

    async getCarritoByld(idCarrito) {
        try {
            const carritos = await this.getCarritos()
            const carrito = carritos.find(e => e.id === idCarrito);
            if (carrito) return carrito
            else {
                return -1
            }

        } catch (error) {
            return error
        }
    }

    async addProductCarrito(cId, pId) {
        try {
            const carritos = await this.getCarritos()
            const carrito = carritos.find(e => e.id === cId);
            if (!carrito) return -2
            const producto = await productManager.getProductByld(pId);
            if (producto == -1) return -1
            const productExist = carrito.productos.find(e => e.id === pId)
            if (productExist) {
                productExist.quantity += 1
            }
            else {
                carrito.productos.push({
                    id: pId,
                    quantity: 1,
                })
            }
            const index = carritos.indexOf(carrito);
            carritos[index] = carrito;
            await fs.promises.writeFile(this.path, JSON.stringify(carritos));
            return "producto añadido correctamente al carrito"
        } catch (error) {
            return error
        }
    }
}

export const carritoManager = new CarritoManager('carrito.json');