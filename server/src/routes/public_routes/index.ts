import { Router } from "express";
import { home } from "./home/home.route";

export const public_routes: Router[] = [home];
