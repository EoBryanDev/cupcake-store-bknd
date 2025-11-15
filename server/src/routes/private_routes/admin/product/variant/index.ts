import { Router } from "express";
import { authAdminMiddleware } from "../../../../../middlewares/auth-admin-handler";
import { ProductVariantAdminController } from "../../../../../controllers/admin/ProductVariantAdminController";

const product_variants_admin: Router = Router();
const productVariantAdminController = new ProductVariantAdminController();
product_variants_admin.post(
  "/admin/products/variants",
  authAdminMiddleware,
  productVariantAdminController.createProductVariant,
);

product_variants_admin.put(
  "/admin/products/variants/:product_variant_id",
  authAdminMiddleware,
  productVariantAdminController.updateProductVariant,
);

export { product_variants_admin };
