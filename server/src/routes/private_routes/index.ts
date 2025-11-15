import { Router } from "express";
import { user } from "./user/user.route";
import { order } from "./order/order.route";
import { products_admin } from "./admin/product";
import { categories_admin } from "./admin/category";
import { product_variants_admin } from "./admin/product/variant";

export const private_routes: Router[] = [
  user,
  order,
  categories_admin,
  products_admin,
  product_variants_admin,
];
