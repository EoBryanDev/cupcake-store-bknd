import { Router } from "express";
import { home } from "./home/home.route";
import { products } from "./product";
import { homeAdmin } from "./admin/home";
import { categories } from "./category";
import { variants } from "./variants";

export const public_routes: Router[] = [
  home,
  products,
  categories,
  variants,
  homeAdmin,
];
