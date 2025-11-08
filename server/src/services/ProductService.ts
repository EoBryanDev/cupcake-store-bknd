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
      return null;
    }

    return products;
  };

  getProductsFilters = async () => {
    const products = await this.productModel.getProductsFilters();

    if (!products.data) {
      return null;
    }

    return products;
  };

  getProductsBySlug = async (slug: string) => {
    const product = await this.productModel.getProductsBySlug(slug);

    if (!product.data) {
      return null;
    }

    return product;
  };
}

export { ProductService };
