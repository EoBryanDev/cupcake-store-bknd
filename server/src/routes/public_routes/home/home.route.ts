import { Router, Request, Response } from "express";
import { UserController } from "../../../controllers/UserController";

const home: Router = Router();
const homeController = new UserController();

home.get("/health-check", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

home.post("/login", homeController.login);

home.post("/register", homeController.register);

export { home };
