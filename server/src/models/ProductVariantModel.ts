import { schema } from "../db/schema";
import { TPagination } from "../schemas/get/pagination";
import { db } from "../lib/postgres-connection";
import { desc, inArray, sum } from "drizzle-orm";

class ProductVariantModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  getProductVariants = async (pagination: TPagination) => {
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

  getProductVariantsByCategory = async (
    pagination: TPagination,
    slug: string,
  ) => {
    const { limit, offset, order, orderBy } = pagination;

    const productVariants = await this.dbPostGres.query.products.findMany({
      where: (products, { eq }) => eq(products.slug, slug),
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
      return this.getProductVariants(pagination);
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

  getProductVariantsBySlug = async (slug: string) => {
    const productVariants = await this.dbPostGres.query.products.findFirst({
      where: (products, { eq }) => eq(products.slug, slug),
      with: {
        category: true,
        variants: true,
      },
    });

    return {
      data: productVariants,
      pagination: {
        offset: 0,
        limit: 1,
        totalItems: productVariants ? 1 : 0,
        totalPages: null,
      },
    };
  };
}

export { ProductVariantModel };
