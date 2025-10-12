import { desc, inArray, sql, sum } from "drizzle-orm";
import { schema } from "../db/schema";
import { TPagination } from "../schemas/get/pagination";
import { db } from "../lib/postgres-connection";

class ProductModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  getProducts = async (pagination: TPagination) => {
    const { limit, offset } = pagination;

    const products = await this.dbPostGres
      .select()
      .from(schema.products)
      .limit(limit)
      .offset((offset - 1) * limit);

    const [{ count }] = await this.dbPostGres
      .select({ count: sql<number>`count(*)` })
      .from(schema.products);

    return {
      data: products,
      pagination: {
        offset,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  };

  getProductsVariants = async (pagination: TPagination) => {
    const { limit, offset, order, orderBy } = pagination;

    const productVariants = await this.dbPostGres.query.products.findMany({
      with: {
        category: true,
        variants: true,
      },
      limit: limit,
      offset: (offset - 1) * limit,
      orderBy: (products, { asc, desc }) => {
        const orderFunction = order === "asc" ? asc : desc;
        const columnToOrder =
          orderBy === "createdAt" ? products.createdAt : products.name;
        return [orderFunction(columnToOrder)];
      },
    });

    return {
      data: productVariants,
      pagination: {
        offset,
        limit,
        totalItems: productVariants.length,
        totalPages: Math.ceil(productVariants.length / limit),
      },
    };
  };

  getMostPopularProducts = async (pagination: TPagination) => {
    const { limit, offset } = pagination;

    const popularVariantsQuery = this.dbPostGres
      .select({
        variantId: schema.orderItems.productVariantId,
        totalSold: sum(schema.orderItems.quantity).mapWith(Number),
      })
      .from(schema.orderItems)
      .groupBy(schema.orderItems.productVariantId)
      .orderBy((agg) => desc(agg.totalSold))
      .limit(limit)
      .offset((offset - 1) * limit);

    const popularVariants = await popularVariantsQuery;

    // Fallback: se não houver produtos vendidos, retorna a lista normal
    if (popularVariants.length === 0) {
      return this.getProductsVariants(pagination);
    }

    const popularVariantIds = popularVariants.map((v) => v.variantId);

    const products = await this.dbPostGres.query.products.findMany({
      where: inArray(
        schema.products.productId,
        this.dbPostGres
          .select({ productId: schema.productVariants.productId })
          .from(schema.productVariants)
          .where(
            inArray(schema.productVariants.productVariantId, popularVariantIds),
          ),
      ),
      with: {
        category: true,
        variants: true,
      },
    });

    return {
      data: products,
      pagination: {
        offset,
        limit,
        totalItems: products.length,
        totalPages: Math.ceil(products.length / limit),
      },
    };
  };
}

export { ProductModel };
