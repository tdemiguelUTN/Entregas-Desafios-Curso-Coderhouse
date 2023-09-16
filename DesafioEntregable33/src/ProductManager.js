//DESAFIO ENTREGABLE: Servidor con express
//Consigna: Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
const fs = require('fs');      //agrego FileSystem

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(objProduct) {
        try {
            if (!objProduct.title) return "Este producto no tiene titulo"
            if (!objProduct.description) return "Este producto no tiene descripcion"
            if (!objProduct.price) return "Este producto no tiene precio"
            if (!objProduct.thumbnail) return "Este producto no tiene ruta de imagen"
            if (!objProduct.code) return "Este producto no tiene codigo identificador"
            if (!objProduct.stock) return "Este producto no tiene stock"
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
            return "Su producto no pudo ser añadido debido a un error"
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
            if (!product) return "No se encontró un producto con este id"
            return product
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
            return "El producto se agregó con éxito!"
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
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return "Su producto se borró con éxito!"
        } catch (error) {
            return "Su producto no se pudo eliminar debido a un error"
        }
    }
}


const producto1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 1000,
    thumbnail: "Sin imagen",
    code: "abc100",
    stock: 25,
}
const producto2 = {
    title: "producto prueba 2",
    description: "Este es un producto prueba 2",
    price: 1500,
    thumbnail: "Sin imagen",
    code: "abc101",
    stock: 150,
}
const producto3 = {
    title: "producto prueba 3",
    description: "Este es un producto prueba 3",
    price: 500,
    thumbnail: "Sin imagen",
    code: "abc102",
    stock: 1,
}
const producto4 = {
    title: "producto prueba 4",
    description: "Este es un producto prueba 4",
    price: 400,
    thumbnail: "Sin imagen",
    code: "abc103",
    stock: 10,
}
const producto5 = {
    title: "producto prueba 5",
    description: "Este es un producto prueba 5",
    price: 250,
    thumbnail: "Sin imagen",
    code: "abc104",
    stock: 200,
}
const producto6 = {
    title: "producto prueba 6",
    description: "Este es un producto prueba 6",
    price: 800,
    thumbnail: "Sin imagen",
    code: "abc105",
    stock: 5,
}
const producto7 = {
    title: "producto prueba 7",
    description: "Este es un producto prueba 7",
    price: 900,
    thumbnail: "Sin imagen",
    code: "abc106",
    stock: 179,
}
const producto8 = {
    title: "producto prueba 8",
    description: "Este es un producto prueba 8",
    price: 350,
    thumbnail: "Sin imagen",
    code: "abc107",
    stock: 150,
}
const producto9 = {
    title: "producto prueba 9",
    description: "Este es un producto prueba 9",
    price: 290,
    thumbnail: "Sin imagen",
    code: "abc108",
    stock: 5,
}
const producto10 = {
    title: "producto prueba 10",
    description: "Este es un producto prueba 10",
    price: 700,
    thumbnail: "Sin imagen",
    code: "abc109",
    stock: 10,
}

async function test() {
    const manager1 = new ProductManager('ProductManager.JSON')
    console.log (await manager1.addProduct(producto1))
    console.log (await manager1.addProduct(producto2))
    console.log (await manager1.addProduct(producto3))
    console.log (await manager1.addProduct(producto4))
    console.log (await manager1.addProduct(producto5))
    console.log (await manager1.addProduct(producto6))
    console.log (await manager1.addProduct(producto7))
    console.log (await manager1.addProduct(producto8))
    console.log (await manager1.addProduct(producto9))
    console.log (await manager1.addProduct(producto10))
}
test()
export const productManager = new ProductManager() //creo una instancia y la exporto para poder utilizarla en otro lugar