import { z } from "zod";

const postAdminProductSchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  unit: z.string().nullable().optional(),
  active: z.boolean(),
});

export type TPostAdminProduct = z.infer<typeof postAdminProductSchema>;

export { postAdminProductSchema };
