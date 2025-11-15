import { sql } from "drizzle-orm";
import { TPagination } from "../schemas/get/pagination";
import { schema } from "../db/schema";
import { db } from "../lib/postgres-connection";

class CategoryModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  getCategories = async (pagination: TPagination) => {
    const { limit, offset, order, orderBy } = pagination;

    const totalCount = await this.dbPostGres
      .select({
        count: sql<number>`count(${schema.categories.categoryId})`,
      })
      .from(schema.categories);

    const totalItems = Number(totalCount[0]?.count || 0);

    const categories = await this.dbPostGres.query.categories.findMany({
      limit: limit,
      offset: offset - 1,
      orderBy: (categories, { asc, desc }) => {
        const orderFunction = order === "asc" ? asc : desc;
        const columnToOrder =
          orderBy === "createdAt" ? categories.createdAt : categories.name;
        return [orderFunction(columnToOrder)];
      },
    });

    return {
      data: categories,
      pagination: {
        offset,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  };

  getCategoryBySlug = async (slug: string) => {
    const category = await this.dbPostGres.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.slug, slug),
    });

    return {
      data: category,
      pagination: {
        offset: 0,
        limit: 1,
        totalItems: category ? 1 : 0,
        totalPages: null,
      },
    };
  };
}

export { CategoryModel };
