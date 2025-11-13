import { z } from "zod";
const putProductAdminSchema = z.object({
  productId: z.string().optional(),
  categoryId: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
  active: z.boolean(),
});

export type TPutAdminProduct = z.infer<typeof putProductAdminSchema>;

export { putProductAdminSchema };
