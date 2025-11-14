import { ConflictError } from "../../errors/http-errors/ConflictError";
import { CategoryAdminModel } from "../../models/admin/CategoryAdminModel";
import { CategoryModel } from "../../models/CategoryModel";
import { TPostAdminCategory } from "../../schemas/admin/post/category";
import { TPutAdminCategory } from "../../schemas/admin/put/category";

class CategoryAdminService {
  categoryModel: CategoryModel;
  categoryAdminModel: CategoryAdminModel;

  constructor() {
    this.categoryModel = new CategoryModel();
    this.categoryAdminModel = new CategoryAdminModel();
  }

  createCategory = async (
    categoryPayload: TPostAdminCategory,
    user_id: string,
  ) => {
    const category = await this.categoryModel.getCategoryBySlug(
      categoryPayload.slug,
    );

    if (category.data) {
      throw new ConflictError("Category already exists!");
    }

    const response = await this.categoryAdminModel.createCategory(
      categoryPayload,
      user_id,
    );

    return response;
  };

  updateCategory = async (
    categoryPayload: TPutAdminCategory,
    category_id: string,
  ) => {
    const response = await this.categoryAdminModel.updateCategory(
      categoryPayload,
      category_id,
    );

    return response;
  };
}

export { CategoryAdminService };
