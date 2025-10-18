import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { standardQueryPaginationSchema } from "../schemas/get/pagination";
import { ProductVariantService } from "../services/ProductVariantsService";

class ProductController {
  productService: ProductService;
  productVariantService: ProductVariantService;

  constructor() {
    this.productService = new ProductService();
    this.productVariantService = new ProductVariantService();
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
      ...data,
      error: "",
    };
    res.status(200).send(response);
  };

  getProductVariants = async (req: Request, res: Response) => {
    const { offset, limit, order, currentPage, orderBy } = req.query;

    const pagination = standardQueryPaginationSchema.parse({
      offset,
      limit,
      order,
      orderBy,
      currentPage,
    });

    const data =
      await this.productVariantService.getProductVariants(pagination);

    const response = {
      ...data,
      error: "",
    };
    res.status(200).send(response);
  };

  getProductsBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;

    const data = await this.productService.getProductsBySlug(slug);

    const response = {
      ...data,
    };

    res.status(200).send(response);
  };

  getProductsVariantsBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;

    const data =
      await this.productVariantService.getProductVariantsBySlug(slug);

    const response = {
      ...data,
      error: "",
    };

    res.status(200).send(response);
  };
}

export { ProductController };
