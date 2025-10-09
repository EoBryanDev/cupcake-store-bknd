import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { schema } from "../db/schema";

class ProductModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  async getProducts(offset: number, limit: number) {
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
  }

  async getProductsVariants(offset: number, limit: number) {
    const productVariants = await this.dbPostGres.query.products.findMany({
      with: {
        category: true,
        variants: true,
      },
      limit: limit,
      offset: (offset - 1) * limit,
      orderBy: (prd, { asc }) => [asc(prd.name)],
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
  }
}

export { ProductModel };
