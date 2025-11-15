import { eq } from "drizzle-orm";
import { schema } from "../../db/schema";
import { db } from "../../lib/postgres-connection";
import { TPutAdminProduct } from "../../schemas/admin/put/product";
import { TPostAdminProduct } from "../../schemas/admin/post/product";

class ProductAdminModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  createProduct = async (
    productPayload: TPostAdminProduct,
    user_id: string,
  ) => {
    const [created] = await this.dbPostGres
      .insert(schema.products)
      .values({ ...productPayload, createdBy: user_id })
      .returning();

    return [created];
  };

  updateProduct = async (
    updateProductPayload: TPutAdminProduct,
    product_id: string,
  ) => {
    const updated = await this.dbPostGres
      .update(schema.products)
      .set({
        ...updateProductPayload,
        // lastUpdateAt: new Date(),
      })
      .where(eq(schema.products.productId, product_id))
      .returning();

    return updated;
  };
}

export { ProductAdminModel };
