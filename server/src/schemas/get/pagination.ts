import { z } from "zod";

const standardQueryPaginationSchema = z.object({
  offset: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).optional().default(30),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  orderBy: z.enum(["name", "createdAt"]).optional().default("name"),
  currentPage: z.coerce.number().min(1).optional(),
  searchType: z.enum(["most-popular", "newest", "default"]).optional(),
  colors: z.string().optional(),
  sizes: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

type TPagination = z.infer<typeof standardQueryPaginationSchema>;

export { standardQueryPaginationSchema };
export type { TPagination };
