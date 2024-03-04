import fs from 'fs';      //agrego FileSystem
import { ERRORES_PRODUCTOS } from './errores.js';

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(objProduct) {
        try {
            if (!objProduct.title) return -1
            if (!objProduct.description) return -2
            if (!objProduct.price) return -3
            //if (!objProduct.thumbnail) return -4 //este campo es opcional, asi que directamente no lo tomo en cuenta
            if (!objProduct.code) return -5
            if (!objProduct.stock) return -6
            if (typeof objProduct.status === 'undefined' || objProduct.status !== true) {
                return -7;
            }
            let id
            const products = await this.getProducts({})

            const codigoExistente = products.find(e => e.code === objProduct.code);
            if (codigoExistente) return "Ya existe un producto con el mismo codigo"
            if (!products.length) {
                id = 1
            }
            else {
                id = products[products.length - 1].id + 1;
            }
            products.push({ id, ...objProduct })
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return "El producto se agregó con éxito!"
        } catch (error) {
            return error
        }

    }

    async getProducts(queryObj) {
        const { limit } = queryObj
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf-8')
                const productsArray = JSON.parse(products);
                return limit ? productsArray.slice(0, limit) : productsArray
            }
            else {
                return []
            }
        } catch (error) {
            return `Error al leer el archivo: ${error}`
        }
    }

    async getProductByld(idProduct) {
        try {
            const products = await this.getProducts({})                 //mando un objeto vacio asi cuando utilizo el getProduct, envia todos los productos
            const product = products.find(e => e.id === idProduct);
            if (product) return product
            else {
                return -1
            }
        } catch (error) {
            return "No se pudo encontrar el producto debido a un error"
        }
    }

    async updateProduct(idProduct, updateProduct) {
        try {
            const products = await this.getProducts({})
            const product = products.find(e => e.id === idProduct);
            if (!product) return "No se puede actualizar este producto porque no existe"
            if (updateProduct.title) product.title = updateProduct.title
            if (updateProduct.description) product.description = updateProduct.description
            if (updateProduct.price) product.price = updateProduct.price
            if (updateProduct.thumbnail) product.thumbnail = updateProduct.thumbnail
            if (updateProduct.stock) product.stock = updateProduct.stock
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return "El producto se actualizó con éxito!"
        } catch (error) {
            return "Su producto no se pudo actualizar correctamente debido a un error"
        }

    }

    async deleteProduct(idProduct) {
        try {
            const products = await this.getProducts({})
            const existeId = products.find(e => e.id === idProduct)
            if (!existeId) return "El producto que se quiere eliminar no existe"
            const product = products.filter(e => e.id !== idProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(product))
            return "Su producto se borró con éxito!"
        } catch (error) {
            return error
        }
    }
}


// const producto1 = {
//     "title": "producto 1",
//     "description": "Este es un producto prueba",
//     "price": 1000,
//     "thumbnail": "Sin imagen",
//     "code": "abc100",
//     "stock": 25
// }

export const productManager = new ProductManager('products.json') //creo una instancia y la exporto para poder utilizarla en otro lugar