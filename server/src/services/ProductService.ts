import { NotFoundError } from "../errors/http-errors/NotFoundError";
import { ProductModel } from "../models/ProductModel";
import { TPagination } from "../schemas/get/pagination";

class ProductService {
  productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  getProducts = async (pagination: TPagination) => {
    const products = await this.productModel.getProducts(pagination);

    if (products.data.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return products;
  };

  getProductsVariants = async (pagination: TPagination) => {
    let products;

    if (pagination.search === "most-popular") {
      products = await this.productModel.getMostPopularProducts(pagination);
    } else {
      products = await this.productModel.getProductsVariants(pagination);
    }

    if (products.data.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return products;
  };
}

export { ProductService };
