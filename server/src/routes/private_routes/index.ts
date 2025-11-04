import { Router } from "express";
import { user } from "./user/user.route";

export const private_routes: Router[] = [user];
