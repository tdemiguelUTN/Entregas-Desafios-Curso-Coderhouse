//DESAFIO ENTREGABLE: Manejo de archivos 
//Consigna: Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. 
//          Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).

const fs = require ('fs');      //agrego FileSystem

        class ProductManager {
            constructor (path){
                this.path = path
            }
        
            async addProduct (objProduct){
                try {
                    if(!objProduct.title)         return "Este producto no tiene titulo"
                    if(!objProduct.description)   return "Este producto no tiene descripcion"
                    if(!objProduct.price)         return "Este producto no tiene precio"
                    if(!objProduct.thumbnail)     return "Este producto no tiene ruta de imagen"
                    if(!objProduct.code)          return "Este producto no tiene codigo identificador"
                    if(!objProduct.stock)         return "Este producto no tiene stock"
                    let id 
                    const products = await this.getProducts()
                    
                    const codigoExistente = products.find (e => e.code === objProduct.code);
                    if (codigoExistente) return "Ya existe un producto con el mismo codigo"
                        if (!products.length){
                        id = 1
                        }
                        else { 
                        id = products[products.length-1].id+1;
                        }
                    products.push ({id, ...objProduct})
                    await fs.promises.writeFile (this.path, JSON.stringify(products))
                    return "El producto se agregó con éxito!"
                } catch (error) {
                    return "Su producto no pudo ser añadido debido a un error"
                }
        
            }
        
            async getProducts(){
                try{
                    if(fs.existsSync(this.path)){
                        const products = await fs.promises.readFile (this.path, 'utf-8')
                        return JSON.parse(products); 
                    }
                    else {
                        return []
                    }
                } catch(error){
                    return 'Error al leer el archivo: $(error)'
                }
            }
        
            async getProductByld(idProduct){
                try{
                    const products = await this.getProducts()
                    const product = products.find (e => e.id === idProduct);
                    if(!product) return "No se encontró un producto con este id"
                    return product 
                } catch(error){
                    return "No se pudo encontrar el producto debido a un error"
                }
            }
            
            async updateProduct(idProduct, updateProduct){
                try {
                    const products = await this.getProducts()
                    const product = products.find (e => e.id === idProduct);
                    if(!product) return "No se puede actualizar este producto porque no existe"
                    if (updateProduct.title) product.title = updateProduct.title
                    if (updateProduct.description) product.description = updateProduct.description
                    if (updateProduct.price) product.price = updateProduct.price
                    if (updateProduct.thumbnail)product.thumbnail = updateProduct.thumbnail
                    if (updateProduct.stock) product.stock = updateProduct.stock
                    await fs.promises.writeFile (this.path, JSON.stringify(products))
                    return "El producto se agregó con éxito!"
                } catch (error) {
                    return "Su producto no se pudo actualizar correctamente debido a un error"
                }

            }

            async deleteProduct(idProduct){
                try {
                    const products = await this.getProducts()
                    const existeId = products.find (e => e.id === idProduct)
                    if (!existeId) return "El producto que se quiere eliminar no existe"
                    const product = products.filter (e => e.id !== idProduct)
                    await fs.promises.writeFile (this.path, JSON.stringify(products))
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
            code: "abc123",
            stock:25,
        }
const producto2 = {
            title: "producto prueba 2",
            description: "Este es un producto prueba 2",
            price: 500,
            thumbnail: "Sin imagen",
            code: "abc321",
            stock:150,
        }
        
        

async function test(){
            const manager1 = new ProductManager('ProductManager.JSON')  
            //console.log (await manager1.getProducts()) 
            //console.log (await manager1.addProduct(producto1))
            //console.log (await manager1.getProducts())
            //console.log (await manager1.getProductByld(3))
            //console.log (await manager1.addProduct(producto2))
            console.log (await manager1.deleteProduct(1))
        }
test()