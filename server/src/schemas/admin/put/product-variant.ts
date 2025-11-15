import { z } from "zod";

const putAdminProductVariantSchema = z.object({
  productVariantId: z.string().optional(),
  productId: z.string().optional(),
  name: z.string().optional(),
  slug: z
    .string()
    .min(2, "Invalid Slug")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must contain lowercase, number and hifens (-) as separators",
    })
    .optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  weight: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  size: z.string().optional(),
  priceInCents: z.number().optional(),
  rawMaterial: z.string().optional(),
  imageUrl: z.string().optional(),
  active: z.boolean(),
});

type TPutAdminProductVariant = z.infer<typeof putAdminProductVariantSchema>;

export type { TPutAdminProductVariant };
export { putAdminProductVariantSchema };
