import { Request, Response } from "express";
import { orderSchema } from "../schemas/post/order";
import { OrderService } from "../services/OrderService";
import { standardQueryPaginationSchema } from "../schemas/get/pagination";
import { updateOrderSchema } from "../schemas/put/order";

class OrderController {
  orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getOrders = async (req: Request, res: Response) => {
    const { offset, limit, order, currentPage, orderBy } = req.query;
    const { user_id } = req.user!;

    const pagination = standardQueryPaginationSchema.parse({
      offset,
      limit,
      order,
      orderBy,
      currentPage,
    });

    const data = await this.orderService.getOrders(pagination, user_id);

    const response = {
      ...data,
      error: "",
    };
    res.status(200).send(response);
  };

  getOrdersByUserId = async (req: Request, res: Response) => {
    const { offset, limit, order, currentPage, orderBy } = req.query;
    const { user_id } = req.user!;

    const pagination = standardQueryPaginationSchema.parse({
      offset,
      limit,
      order,
      orderBy,
      currentPage,
    });

    const data = await this.orderService.getOrdersByUserId(user_id, pagination);

    const response = {
      ...data,
      error: "",
    };
    res.status(200).send(response);
  };

  createOrder = async (req: Request, res: Response) => {
    const { body } = req;
    const { user_id } = req.user!;

    const orderPayload = orderSchema.parse(body);

    const orderCreated = await this.orderService.createOrder(
      orderPayload,
      user_id,
    );

    const response = {
      data: orderCreated,
      error: "",
    };
    res.status(200).send(response);
  };

  updateOrder = async (req: Request, res: Response) => {
    const { body } = req;
    const { order_id } = req.params;

    const updatedOrder = updateOrderSchema.parse({
      ...body,
      orderId: order_id,
    });

    const userUpdated = await this.orderService.updateOrder(updatedOrder);

    const response = {
      data: [userUpdated],
      error: "",
    };
    res.status(200).send(response);
  };
}

export { OrderController };
