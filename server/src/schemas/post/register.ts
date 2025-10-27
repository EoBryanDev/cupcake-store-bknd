import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  legalId: z.string(),
  birthDate: z.date(),
  email: z.email(),
  password: z.string(),
});

type TRegister = z.infer<typeof registerSchema>;

export { registerSchema };
export type { TRegister };
