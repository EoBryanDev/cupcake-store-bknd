import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth-handler";
import { OrderController } from "../../../controllers/OrderController";
import { authAdminMiddleware } from "../../../middlewares/auth-admin-handler";

const order: Router = Router();
const orderController = new OrderController();

order.get("/orders-user", authMiddleware, orderController.getOrdersByUserId);

order.get("/orders", authAdminMiddleware, orderController.getOrders);

order.post("/orders", authMiddleware, orderController.createOrder);

order.put(
  "/orders/:orders_id",
  authAdminMiddleware,
  orderController.updateOrder,
);

export { order };
