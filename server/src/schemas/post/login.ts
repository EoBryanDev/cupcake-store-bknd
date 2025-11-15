import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type TLogin = z.infer<typeof loginSchema>;

export { loginSchema };
export type { TLogin };
