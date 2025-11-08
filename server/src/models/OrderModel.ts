import { eq } from "drizzle-orm";
import { schema } from "../db/schema";
import { db } from "../lib/postgres-connection";
import { TOrder } from "../schemas/post/order";
import { TUpdateOrder } from "../schemas/put/order";
import { TPagination } from "../schemas/get/pagination";

class OrderModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  createOrder = async (orderPayload: TOrder, user_id: string) => {
    return await this.dbPostGres.transaction(async (tx) => {
      const [created] = await tx
        .insert(schema.orders)
        .values({
          receiverName: orderPayload.receiverName,
          street: orderPayload.street,
          number: orderPayload.number,
          complement: orderPayload.complement,
          referencePoint: orderPayload.referencePoint,
          neighborhood: orderPayload.neighborhood,
          city: orderPayload.city,
          state: orderPayload.state,
          country: orderPayload.country,
          zipCode: orderPayload.zipCode,
          phoneNumber: orderPayload.phoneNumber,
          shippingCompany: orderPayload.shippingCompany,
          shippingTax: orderPayload.shippingTax,
          discount: orderPayload.discount,
          totalPriceInCents: orderPayload.totalPriceInCents,
          status: orderPayload.status,
          paymentType: orderPayload.paymentType,
          userId: user_id,
        })
        .returning();

      const itemsToInsert = orderPayload.items.map((item) => ({
        orderId: created.orderId,
        productVariantId: item.productVariantId,
        name: item.name,
        priceInCents: item.priceInCents,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
      }));

      const items_returning = await tx
        .insert(schema.orderItems)
        .values(itemsToInsert)
        .returning();

      return { ...created, items: items_returning };
    });
  };

  getOrders = async (pagination: TPagination) => {
    const { limit, offset, order, orderBy } = pagination;

    const orders = await this.dbPostGres.query.orders.findMany({
      with: {
        items: true,
      },
      limit: limit,
      offset: (offset - 1) * limit,
      orderBy: (orders, { asc, desc }) => {
        const orderFunction = order === "asc" ? asc : desc;
        const columnToOrder =
          orderBy === "createdAt" ? orders.createdAt : orders.street;
        return [orderFunction(columnToOrder)];
      },
    });

    return {
      data: orders,
      pagination: {
        offset,
        limit,
        totalItems: orders.length,
        totalPages: Math.ceil(orders.length / limit),
      },
    };
  };

  getOrdersByUserId = async (userId: string, pagination: TPagination) => {
    const { limit, offset, order, orderBy } = pagination;
    const orders = await this.dbPostGres.query.orders.findMany({
      where: eq(schema.orders.userId, userId),
      with: {
        items: true,
      },
      limit: limit,
      offset: (offset - 1) * limit,
      orderBy: (orderReq, { asc, desc }) => {
        const orderFunction = order === "asc" ? asc : desc;
        const columnToOrder =
          orderBy === "createdAt" ? orderReq.createdAt : orderReq.street;
        return [orderFunction(columnToOrder)];
      },
    });

    return {
      data: orders,
      pagination: {
        offset,
        limit,
        totalItems: orders.length,
        totalPages: Math.ceil(orders.length / limit),
      },
    };
  };

  updateOrder = async (updateOrderPayload: TUpdateOrder) => {
    const [updated] = await this.dbPostGres
      .update(schema.orders)
      .set({
        ...updateOrderPayload,
        lastUpdateAt: new Date(),
      })
      .where(eq(schema.orders.orderId, updateOrderPayload.orderId))
      .returning();

    return updated;
  };
}

export { OrderModel };
