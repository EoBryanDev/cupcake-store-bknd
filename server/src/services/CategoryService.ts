import { CategoryModel } from "../models/CategoryModel";
import { TPagination } from "../schemas/get/pagination";

class CategoryService {
  categoryModel: CategoryModel;

  constructor() {
    this.categoryModel = new CategoryModel();
  }

  getCategories = async (pagination: TPagination) => {
    const categories = await this.categoryModel.getCategories(pagination);

    if (!categories.data) {
      return null;
    }

    return categories;
  };
}

export { CategoryService };
