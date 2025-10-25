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

  getProductsFilters = async () => {
    const products = await this.productModel.getProductsFilters();

    if (!products.data) {
      throw new NotFoundError("Filters not found");
    }

    return products;
  };

  getProductsBySlug = async (slug: string) => {
    const product = await this.productModel.getProductsBySlug(slug);

    if (!product.data) {
      throw new NotFoundError("Products not found");
    }

    return product;
  };
}

export { ProductService };
