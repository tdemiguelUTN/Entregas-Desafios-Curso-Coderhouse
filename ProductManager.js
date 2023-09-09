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
                    
                    const codigoExistente =  objProduct.code !== undefined && products.find (e => e.code === objProduct.code);
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
                        return "holaaa"
                    }
                } catch(error){
                    return 'Error al leer el archivo: $(error)'
                }
            }
        
            async getProductByld(idProduct){
                try{
                    const products = await this.getProducts()
                    const product = products.find (e => e.id === idProduct);
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
                    products.push ({...product, ...updateProduct})
                    await fs.promises.writeFile (this.path, JSON.stringify(products))
                    return "El producto se agregó con éxito!"
                } catch (error) {
                    return "Su producto no se pudo actualizar correctamente debido a un error"
                }

            }

            async deleteProduct(idProduct){
                try {
                    const products = await this.getProducts()
                    const product = products.filter (e => e.id !== idProduct);
                    await fs.promises.writeFile (this.path, JSON.stringify(product))
                } catch (error) {
                    return "Su producto no se pudo eliminar debido a un error"
                }
                
            }

        }

async function test(){
            const manager1 = new ProductManager('Users.json')  
            await manager1.getProducts()
        }
test()