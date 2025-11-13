import { Router } from "express";
import { CategoryAdminController } from "../../../../controllers/admin/CategoryAdminController";
import { authAdminMiddleware } from "../../../../middlewares/auth-admin-handler";

const categories_admin: Router = Router();
const categoryAdminController = new CategoryAdminController();

// prefix da rota é o product
categories_admin.post(
  "/admin/categories",
  authAdminMiddleware,
  categoryAdminController.createCategory,
);
categories_admin.put(
  "/admin/categories/:category_id",
  authAdminMiddleware,
  categoryAdminController.updateCategory,
);

export { categories_admin };
