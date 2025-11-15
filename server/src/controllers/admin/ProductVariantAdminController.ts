import { Request, Response } from "express";
import { putAdminProductVariantSchema } from "../../schemas/admin/put/product-variant";
import { postAdminProductVariantSchema } from "../../schemas/admin/post/product-variant";
import { ProductVariantAdminService } from "../../services/admin/ProductVariantAdminService";

class ProductVariantAdminController {
  productVariantAdminService: ProductVariantAdminService;

  constructor() {
    this.productVariantAdminService = new ProductVariantAdminService();
  }

  createProductVariant = async (req: Request, res: Response) => {
    const { body } = req;
    const { user_id } = req.user!;

    const bodyPayload = postAdminProductVariantSchema.parse(body);

    const data = await this.productVariantAdminService.createProductVariant(
      bodyPayload,
      user_id,
    );

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };

  updateProductVariant = async (req: Request, res: Response) => {
    const { body } = req;
    const { product_variant_id } = req.params;

    const bodyPayload = putAdminProductVariantSchema.parse({
      ...body,
      productVariantId: product_variant_id,
    });

    const data = await this.productVariantAdminService.updateProductVariant(
      bodyPayload,
      product_variant_id,
    );

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { ProductVariantAdminController };
