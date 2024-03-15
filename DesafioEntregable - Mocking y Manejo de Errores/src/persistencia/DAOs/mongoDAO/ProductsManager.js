import BasicManager from "../mongoDAO/BasicManager.js";
import { productsModel } from "../../db/models/products.model.js";

//ProductsManager hereda todas las propiedades y metodos de BasicManager 
class ProductsManager extends BasicManager {
  constructor() {
    super(productsModel)
  }
  async findAll(obj) {
    const { limit = 10, page = 1, sort, ...queryFilter } = obj;   //me quedo con los datos que me mandan en esas propiedades. El resto de las propiedades, la guardo en queryFilter         
    const query = {
      stock: queryFilter.stock == 'true' ? {$gte: 1} : {$gte: 0} 
    }
    const response = await productsModel.paginate(query, {        //primer argumento:filtro. segundo argumento: son las opciones 
      limit,
      page,
      sort: { price: sort === "asc" ? 1 : -1 },
      lean: true,
    });
    const info = {
      status: response.docs ? response.status = true : response.status = false,
      payload: response.docs,
      count: response.totalDocs,
      totalPages: response.totalPages,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      prevLink: response.hasPrevPage
        ? `http://localhost:8080/api/products?page=${response.prevPage}`
        : null,
      nextLink: response.hasNextPage
        ? `http://localhost:8080/api/products?page=${response.nextPage}`
        : null,
    };
    return info;
  }
}


export const productsManager = new ProductsManager();

