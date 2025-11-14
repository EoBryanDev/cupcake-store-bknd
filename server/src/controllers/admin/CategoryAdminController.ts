import { Request, Response } from "express";
import { postAdminCategorySchema } from "../../schemas/admin/post/category";
import { putCategoryAdminSchema } from "../../schemas/admin/put/category";
import { CategoryAdminService } from "../../services/admin/CategoryAdminService";

class CategoryAdminController {
  categoryAdminService: CategoryAdminService;

  constructor() {
    this.categoryAdminService = new CategoryAdminService();
  }

  createCategory = async (req: Request, res: Response) => {
    const { body } = req;
    const { user_id } = req.user!;

    const bodyPayload = postAdminCategorySchema.parse(body);

    const data = await this.categoryAdminService.createCategory(
      bodyPayload,
      user_id,
    );

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };

  updateCategory = async (req: Request, res: Response) => {
    const { body } = req;
    const { category_id } = req.params;

    const bodyPayload = putCategoryAdminSchema.parse({
      ...body,
      productId: category_id,
    });

    const data = await this.categoryAdminService.updateCategory(
      bodyPayload,
      category_id,
    );

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { CategoryAdminController };
