import { eq } from "drizzle-orm";
import { schema } from "../../db/schema";
import { db } from "../../lib/postgres-connection";
import { TPostAdminCategory } from "../../schemas/admin/post/category";
import { TPutAdminCategory } from "../../schemas/admin/put/category";

class CategoryAdminModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  createCategory = async (
    categoryPayload: TPostAdminCategory,
    user_id: string,
  ) => {
    const [created] = await this.dbPostGres
      .insert(schema.categories)
      .values({ ...categoryPayload, createdBy: user_id })
      .returning();

    return [created];
  };

  updateCategory = async (
    updateCategoryPayload: TPutAdminCategory,
    category_id: string,
  ) => {
    const updated = await this.dbPostGres
      .update(schema.categories)
      .set({
        ...updateCategoryPayload,
        // lastUpdateAt: new Date(),
      })
      .where(eq(schema.categories.categoryId, category_id))
      .returning();

    return updated;
  };
}

export { CategoryAdminModel };
