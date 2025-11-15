import { ConflictError } from "../../errors/http-errors/ConflictError";
import { ProductVariantAdminModel } from "../../models/admin/ProductVariantAdminModel";
import { ProductVariantModel } from "../../models/ProductVariantModel";
import { TPostAdminProductVariant } from "../../schemas/admin/post/product-variant";
import { TPutAdminProductVariant } from "../../schemas/admin/put/product-variant";

class ProductVariantAdminService {
  productVariantModel: ProductVariantModel;
  productVariantAdminModel: ProductVariantAdminModel;

  constructor() {
    this.productVariantModel = new ProductVariantModel();
    this.productVariantAdminModel = new ProductVariantAdminModel();
  }

  createProductVariant = async (
    productVariantPayload: TPostAdminProductVariant,
    user_id: string,
  ) => {
    const product_variants =
      await this.productVariantModel.getProductVariantsBySlug(
        productVariantPayload.slug,
      );

    if (product_variants.data) {
      throw new ConflictError("Product already exists!");
    }

    const response = await this.productVariantAdminModel.createProductVariant(
      productVariantPayload,
      user_id,
    );

    return response;
  };

  updateProductVariant = async (
    productVariantPayload: TPutAdminProductVariant,
    product_variant_id: string,
  ) => {
    const response = await this.productVariantAdminModel.updateProductVariant(
      productVariantPayload,
      product_variant_id,
    );

    return response;
  };
}

export { ProductVariantAdminService };
