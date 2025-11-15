import { eq } from "drizzle-orm";
import { schema } from "../../db/schema";
import { db } from "../../lib/postgres-connection";
import { TPutAdminProductVariant } from "../../schemas/admin/put/product-variant";
import { TPostAdminProductVariant } from "../../schemas/admin/post/product-variant";

class ProductVariantAdminModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  createProductVariant = async (
    productVariantPayload: TPostAdminProductVariant,
    user_id: string,
  ) => {
    const [created] = await this.dbPostGres
      .insert(schema.productVariants)
      .values({ ...productVariantPayload, createdBy: user_id })
      .returning();

    return [created];
  };

  updateProductVariant = async (
    updateProductVariantPayload: TPutAdminProductVariant,
    productVariant_id: string,
  ) => {
    const [updated] = await this.dbPostGres
      .update(schema.productVariants)
      .set({
        ...updateProductVariantPayload,
        // lastUpdateAt: new Date(),
      })
      .where(eq(schema.productVariants.productVariantId, productVariant_id))
      .returning();

    return [updated];
  };
}

export { ProductVariantAdminModel };
