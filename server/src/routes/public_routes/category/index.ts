import { Router } from "express";
import { CategoryController } from "../../../controllers/CategoryController";

const categories: Router = Router();
const categoryController = new CategoryController();

// prefix da rota é o product
categories.get("/categories", categoryController.getCategories);

export { categories };
