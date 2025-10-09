import { z } from "zod";

const standardQueryPaginationSchema = z.object({
  offset: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(60).default(30),
});

export { standardQueryPaginationSchema };
