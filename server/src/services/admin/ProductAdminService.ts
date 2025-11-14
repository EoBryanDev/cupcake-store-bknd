import { ConflictError } from "../../errors/http-errors/ConflictError";
import { ProductAdminModel } from "../../models/admin/ProductAdminModel";
import { ProductModel } from "../../models/ProductModel";
import { TPostAdminProduct } from "../../schemas/admin/post/product";
import { TPutAdminProduct } from "../../schemas/admin/put/product";

class ProductAdminService {
  productModel: ProductModel;
  productAdminModel: ProductAdminModel;

  constructor() {
    this.productModel = new ProductModel();
    this.productAdminModel = new ProductAdminModel();
  }

  createProduct = async (
    productPayload: TPostAdminProduct,
    user_id: string,
  ) => {
    const products = await this.productModel.getProductsBySlug(
      productPayload.slug,
    );

    if (products.data) {
      throw new ConflictError("Product already exists!");
    }

    const response = await this.productAdminModel.createProduct(
      productPayload,
      user_id,
    );

    return response;
  };

  updateProduct = async (
    productPayload: TPutAdminProduct,
    product_id: string,
  ) => {
    // const products = await this.productModel.getProductsBySlug(
    //   productPayload.slug,
    // );

    // if (!products) {
    //   throw new NotFoundError("Product not exists!");
    // }

    const response = await this.productAdminModel.updateProduct(
      productPayload,
      product_id,
    );

    return response;
  };
}

export { ProductAdminService };
