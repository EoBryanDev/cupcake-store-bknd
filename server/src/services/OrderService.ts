import { AuthError } from "../errors/http-errors/AuthError";
import { OrderModel } from "../models/OrderModel";
import { UserModel } from "../models/UserModel";
import { TPagination } from "../schemas/get/pagination";
import { TOrder } from "../schemas/post/order";
import { TUpdateOrder } from "../schemas/put/order";

class OrderService {
  orderModel: OrderModel;
  userModel: UserModel;
  constructor() {
    this.orderModel = new OrderModel();
    this.userModel = new UserModel();
  }

  getOrdersByUserId = async (userId: string, pagination: TPagination) => {
    const orders = await this.orderModel.getOrdersByUserId(userId, pagination);

    if (orders.data.length === 0) {
      return null;
    }

    return orders;
  };

  getOrders = async (pagination: TPagination, user_id: string) => {
    const user = await this.userModel.findUserById(user_id);

    if (user?.role !== "ADMIN") {
      throw new AuthError("User Unauthorized");
    }

    const orders = await this.orderModel.getOrders(pagination);

    if (orders.data.length === 0) {
      return null;
    }

    return orders;
  };

  createOrder = async (orderPayload: TOrder, user_id: string) => {
    const response = await this.orderModel.createOrder(orderPayload, user_id);

    return response;
  };

  updateOrder = async (updateOrderPayload: TUpdateOrder) => {
    const response = await this.orderModel.updateOrder(updateOrderPayload);

    return response;
  };
}

export { OrderService };
