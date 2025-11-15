import { Router } from "express";
import { ProductController } from "../../../controllers/ProductController";

const variants: Router = Router();
const productController = new ProductController();

// prefix da rota é o product
variants.get("/variants", productController.getProductVariantsOnly);

export { variants };
