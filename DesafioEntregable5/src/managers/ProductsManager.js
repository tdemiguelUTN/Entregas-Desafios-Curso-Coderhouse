import BasicManager from "../managers/BasicManager.js";
import { productsModel } from "../dao/db/models/products.model.js";

//ProductsManager hereda todas las propiedades y metodos de BasicManager 
class ProductsManager extends BasicManager {
    constructor() {
        super(productsModel)
    }
}

export const productsManager = new ProductsManager();

