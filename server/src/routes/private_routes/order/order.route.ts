import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth-handler";
import { OrderController } from "../../../controllers/OrderController";

const order: Router = Router();
const orderController = new OrderController();

order.get("/orders", authMiddleware, orderController.getOrders);

order.get("/orders-user", authMiddleware, orderController.getOrdersByUserId);

order.post("/orders", authMiddleware, orderController.createOrder);

order.put("/orders/:orders_id", authMiddleware, orderController.updateOrder);

export { order };
