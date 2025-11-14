import { Request, Response } from "express";
import { postAdminProductSchema } from "../../schemas/admin/post/product";
import { putProductAdminSchema } from "../../schemas/admin/put/product";
import { ProductAdminService } from "../../services/admin/ProductAdminService";

class ProductAdminController {
  productAdminService: ProductAdminService;

  constructor() {
    this.productAdminService = new ProductAdminService();
  }

  createProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { user_id } = req.user!;

    const bodyPayload = postAdminProductSchema.parse(body);

    const data = await this.productAdminService.createProduct(
      bodyPayload,
      user_id,
    );

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };

  updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { product_id } = req.params;

    const bodyPayload = putProductAdminSchema.parse({
      ...body,
      productId: product_id,
    });

    const data = await this.productAdminService.updateProduct(
      bodyPayload,
      product_id,
    );

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { ProductAdminController };
