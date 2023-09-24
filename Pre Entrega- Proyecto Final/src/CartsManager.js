import fs from 'fs';
import { productManager } from './ProductManager';

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
            await fs.promises.writeFile(this.path, JSON.stringify([...carritos, newCarrito])); // Convertir el array en una cadena JSON y escribirlo en el archivo
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
            if (!carrito) return "No se encontró un carrito con este id"
            return carrito
        } catch (error) {
            return error
        }
    }

    async addProductCarrito(pId, cId) {
        try {
            const carritos = await this.getCarritos()
            const carrito = carritos.find(e => e.id === cId);
            if (!carrito) return "el carrito no existe"
            const producto = productManager.getProductByld(pId);
            if (!producto) return "el producto que desea agregar no existe"
            const productExist = carritos.productos.find(e => e.id === pId)
            if (productExist) {
                productExist.quantity += 1
            }
            else {
                carritos.productos.push({
                    id: pId,
                    quantity: 1,
                })
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carritos));
            return "producto añadido correctamente al carrito"
        } catch (error) {
            return error
        }


    }
}

export const CarritoManager = new CarritoManager('carrito.json')