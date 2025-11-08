import { Router } from "express";
import { user } from "./user/user.route";
import { order } from "./order/order.route";

export const private_routes: Router[] = [user, order];
