import { Router } from "express";
import { ProductController } from "../../../controllers/ProductController";

const products: Router = Router();
const productController = new ProductController();

// prefix da rota é o product
products.get("/products", productController.getProducts);

products.get("/products/filters", productController.getProductsFilters);

products.get("/products/variants", productController.getProductVariants);

products.get("/products/:slug", productController.getProductsBySlug);

products.get(
  "/products/:slug/variants/categories",
  productController.getProductsVariantsByCategory,
);
products.get(
  "/products/:slug/variants",
  productController.getProductsVariantsBySlug,
);

export { products };
