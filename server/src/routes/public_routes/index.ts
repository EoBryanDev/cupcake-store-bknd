import { Router } from "express";
import { home } from "./home/home.route";
import { products } from "./product";
import { homeAdmin } from "./admin/home";

export const public_routes: Router[] = [home, products, homeAdmin];
