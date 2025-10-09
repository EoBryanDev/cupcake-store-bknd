import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { standardQueryPaginationSchema } from "../schemas/get/pagination";

class ProductController {
  productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async getProducts(req: Request, res: Response) {
    const { offset, limit } = req.query;

    const pagination = standardQueryPaginationSchema.parse({ offset, limit });

    const data = await this.productService.getProducts(
      pagination.offset,
      pagination.limit,
    );

    const response = {
      data,
      offset,
      limit,
      total: null,
      error: "",
    };
    res.status(200).send(response);
  }

  async getProductsVariants(req: Request, res: Response) {
    const { offset, limit } = req.query;

    console.log("here");

    const pagination = standardQueryPaginationSchema.parse({ offset, limit });

    const data = await this.productService.getProductsVariants(
      pagination.offset,
      pagination.limit,
    );

    const response = {
      data,
      offset,
      limit,
      total: null,
      error: "",
    };
    res.status(200).send(response);
  }
}

export { ProductController };
