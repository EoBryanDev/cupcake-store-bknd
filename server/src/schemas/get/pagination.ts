import { z } from "zod";

const standardQueryPaginationSchema = z.object({
  offset: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(60).optional().default(30),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  orderBy: z.enum(["name", "createdAt"]).optional().default("name"),
  currentPage: z.coerce.number().min(1).optional(),
  search: z.enum(["most-popular"]).optional(),
});

type TPagination = z.infer<typeof standardQueryPaginationSchema>;

export { standardQueryPaginationSchema };
export type { TPagination };
