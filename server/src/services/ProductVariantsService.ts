import { NotFoundError } from "../errors/http-errors/NotFoundError";
import { ProductVariantModel } from "../models/ProductVariantModel";
import { TPagination } from "../schemas/get/pagination";

class ProductVariantService {
  productVariantModel: ProductVariantModel;

  constructor() {
    this.productVariantModel = new ProductVariantModel();
  }

  getProductVariants = async (pagination: TPagination) => {
    let products;

    if (pagination.search === "most-popular") {
      products =
        await this.productVariantModel.getMostPopularProducts(pagination);
    } else {
      products = await this.productVariantModel.getProductVariants(pagination);
    }

    if (products.data.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return products;
  };

  getProductVariantsBySlug = async (slug: string) => {
    const productVariant =
      await this.productVariantModel.getProductVariantsBySlug(slug);

    if (!productVariant.data) {
      throw new NotFoundError("Products not found");
    }

    return productVariant;
  };
}

export { ProductVariantService };
