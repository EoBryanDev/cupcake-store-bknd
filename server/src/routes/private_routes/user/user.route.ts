import { Router } from "express";
import { UserController } from "../../../controllers/UserController";
import { authMiddleware } from "../../../middlewares/auth-handler";

const user: Router = Router();
const userController = new UserController();

user.get("/addresses", authMiddleware, userController.getAddresses);

user.post("/addresses", authMiddleware, userController.createAddress);

user.put(
  "/addresses/:address_id",
  authMiddleware,
  userController.updateAddress,
);

user.delete(
  "/addresses/:address_id",
  authMiddleware,
  userController.deleteAddress,
);

export { user };
