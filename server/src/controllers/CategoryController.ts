import { Request, Response } from "express";
import { standardQueryPaginationSchema } from "../schemas/get/pagination";
import { CategoryService } from "../services/CategoryService";

class CategoryController {
  categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  getCategories = async (req: Request, res: Response) => {
    const { offset, limit, order, currentPage, orderBy } = req.query;

    const pagination = standardQueryPaginationSchema.parse({
      offset,
      limit,
      order,
      orderBy,
      currentPage,
    });

    const data = await this.categoryService.getCategories(pagination);

    const response = {
      ...data,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { CategoryController };
