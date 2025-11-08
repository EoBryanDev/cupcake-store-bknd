import { ProductVariantModel } from "../models/ProductVariantModel";
import { TPagination } from "../schemas/get/pagination";

class ProductVariantService {
  productVariantModel: ProductVariantModel;

  constructor() {
    this.productVariantModel = new ProductVariantModel();
  }

  getProductVariants = async (pagination: TPagination) => {
    let products;

    if (pagination.searchType === "most-popular") {
      products =
        await this.productVariantModel.getMostPopularProducts(pagination);
    } else if (pagination.searchType === "newest") {
      products = await this.productVariantModel.getProductVariants(pagination);
    } else {
      products = await this.productVariantModel.getProductVariants(pagination);
    }

    if (products.data.length === 0) {
      return null;
    }

    return products;
  };

  getProductVariantsBySlug = async (slug: string) => {
    const productVariant =
      await this.productVariantModel.getProductVariantsBySlug(slug);

    if (!productVariant.data) {
      return null;
    }

    return productVariant;
  };

  getProductVariantsByCategory = async (
    pagination: TPagination,
    slug: string,
  ) => {
    const productVariantCategories =
      await this.productVariantModel.getProductVariantsByCategory(
        pagination,
        slug,
      );

    if (productVariantCategories.data.length === 0) {
      const productVariants = await this.getProductVariants(pagination);

      if (!productVariants) {
        return null;
      }
      if (productVariants.data.length === 0) {
        return null;
      }

      return productVariants;
    }

    return productVariantCategories;
  };
}

export { ProductVariantService };
