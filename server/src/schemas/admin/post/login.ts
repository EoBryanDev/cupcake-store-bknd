import { z } from "zod";

const loginAdminSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type TAdminLogin = z.infer<typeof loginAdminSchema>;

export { loginAdminSchema };
export type { TAdminLogin };
