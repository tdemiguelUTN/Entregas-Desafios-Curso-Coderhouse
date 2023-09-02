//DESAFIO ENTREGABLE: Clases con ECMAScript
        //Consigna Realizar una clase “ProductManager” que gestione un conjunto de productos.


        class ProductManager {
            constructor (){
                this.products =[]
            }
        
            addProduct (producto){
                if(!producto.title)         return "Este producto no tiene titulo"
                if(!producto.description)   return "Este producto no tiene descripcion"
                if(!producto.price)         return "Este producto no tiene precio"
                if(!producto.thumbnail)     return "Este producto no tiene ruta de imagen"
                if(!producto.code)          return "Este producto no tiene codigo identificador"
                if(!producto.stock)         return "Este producto no tiene stock"
                const codeExist = this.products.find(product => product.code === producto.code);
                
                if (codeExist) return "Este codigo ya existe!";
        
                const idProducto = this.products.length ? 
                    this.products[this.products.length-1].id+1
                    :
                    1
                producto.id = idProducto;
                this.products.push(producto)   
                return "El producto se agrego con exito!"            
            }
        
            getProducts(){
                return this.products;
            }
        
            getProductByld(id){
                const productoEncontrado = this.products.find(product => product.id === id)
                if (!productoEncontrado) return "Not found";
                return productoEncontrado
            }
        }
        
        const producto1 = {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock:25,
        }
        
        const productManager = new ProductManager();            //prueba 1
        console.log(productManager.getProducts());              //prueba 2
        console.log (productManager.addProduct(producto1));     //prueba 3
        console.log(productManager.getProducts());              //prueba 4
        console.log (productManager.addProduct(producto1));     //prueba 5
        console.log(productManager.getProductByld(3));          //prueba 6: coloco un id inexistente para que devuelva error