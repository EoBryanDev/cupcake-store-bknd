import { Router } from "express";
import { user } from "./user/user.route";
import { order } from "./order/order.route";
import { products_admin } from "./admin/product";

export const private_routes: Router[] = [user, order, products_admin];
