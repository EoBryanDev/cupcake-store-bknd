import { Router } from "express";
import { UserController } from "../../../controllers/UserController";
import { authMiddleware } from "../../../middlewares/auth-handler";

const user: Router = Router();
const userController = new UserController();

user.get("/addresses", authMiddleware, userController.getAddresses);

user.post("/addresses", authMiddleware, userController.createAddress);

user.put("/addresses", authMiddleware, userController.updateAddress);

export { user };
