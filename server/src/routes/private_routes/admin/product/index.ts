import { Router } from "express";
import { ProductAdminController } from "../../../../controllers/admin/ProductAdminController";
import { authAdminMiddleware } from "../../../../middlewares/auth-admin-handler";

const products_admin: Router = Router();
const productAdminController = new ProductAdminController();
products_admin.post(
  "/admin/products",
  authAdminMiddleware,
  productAdminController.createProduct,
);

products_admin.put(
  "/admin/products/:product_id",
  authAdminMiddleware,
  productAdminController.updateProduct,
);

export { products_admin };
