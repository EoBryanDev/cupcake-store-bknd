import { Router } from "express";
import { home } from "./home/home.route";
import { products } from "./product";

export const public_routes: Router[] = [home, products];
