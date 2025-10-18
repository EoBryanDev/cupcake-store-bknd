import { sql } from "drizzle-orm";
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

  getProductsBySlug = async (slug: string) => {
    const products = await this.dbPostGres.query.products.findFirst({
      where: (products, { eq }) => eq(products.slug, slug),
      with: {
        category: true,
      },
    });

    return {
      data: products,
      pagination: {
        offset: 0,
        limit: 1,
        totalItems: products ? 1 : 0,
        totalPages: null,
      },
    };
  };
}

export { ProductModel };
