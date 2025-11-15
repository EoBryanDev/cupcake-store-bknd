import { z } from "zod";
const putCategoryAdminSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
});

export type TPutAdminCategory = z.infer<typeof putCategoryAdminSchema>;

export { putCategoryAdminSchema };
