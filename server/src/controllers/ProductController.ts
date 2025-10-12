import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { standardQueryPaginationSchema } from "../schemas/get/pagination";

class ProductController {
  productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts = async (req: Request, res: Response) => {
    const { offset, limit, order, currentPage, orderBy } = req.query;

    const pagination = standardQueryPaginationSchema.parse({
      offset,
      limit,
      order,
      orderBy,
      currentPage,
    });

    const data = await this.productService.getProducts(pagination);

    const response = {
      data,
      offset,
      limit,
      total: null,
      error: "",
    };
    res.status(200).send(response);
  };

  getProductsVariants = async (req: Request, res: Response) => {
    const { offset, limit, order, currentPage, orderBy } = req.query;

    const pagination = standardQueryPaginationSchema.parse({
      offset,
      limit,
      order,
      orderBy,
      currentPage,
    });

    const data = await this.productService.getProductsVariants(pagination);

    const response = {
      data,
      offset,
      limit,
      total: null,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { ProductController };
