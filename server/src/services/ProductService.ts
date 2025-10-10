import { NotFoundError } from "../errors/http-errors/NotFoundError";
import { ProductModel } from "../models/ProductModel";

class ProductService {
  productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  getProducts = async (offset: number, limit: number) => {
    const products = await this.productModel.getProducts(offset, limit);

    if (products.data.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return products;
  };

  getProductsVariants = async (offset: number, limit: number) => {
    const products = await this.productModel.getProductsVariants(offset, limit);

    if (products.data.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return products;
  };
}

export { ProductService };
