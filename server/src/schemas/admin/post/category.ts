import { z } from "zod";

const postAdminCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
});

export type TPostAdminCategory = z.infer<typeof postAdminCategorySchema>;

export { postAdminCategorySchema };
