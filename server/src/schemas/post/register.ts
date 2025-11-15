import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  legalId: z.string(),
  birthDate: z.iso.datetime(),
  email: z.email(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

type TRegister = z.infer<typeof registerSchema>;

export { registerSchema };
export type { TRegister };
