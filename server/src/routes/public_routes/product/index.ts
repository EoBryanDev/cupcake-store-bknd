import { Router } from "express";
import { ProductController } from "../../../controllers/ProductController";

const products: Router = Router();
const productController = new ProductController();

products.get("/products", productController.getProducts);

products.get("/products/variants", productController.getProductsVariants);

export { products };
