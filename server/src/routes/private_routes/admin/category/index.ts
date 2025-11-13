import { Router } from "express";
import { CategoryAdminController } from "../../../../controllers/admin/CategoryAdminController";

const categoriesAdmin: Router = Router();
const categoryAdminController = new CategoryAdminController();

// prefix da rota é o product
categoriesAdmin.post(
  "/admin/categories",
  categoryAdminController.createCategory,
);
categoriesAdmin.put(
  "/admin/categories/:category_id",
  categoryAdminController.updateCategory,
);

export { categoriesAdmin };
