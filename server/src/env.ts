import { z } from "zod";

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
  SERVER_IP: z.string().default("http://localhost"),
  SERVER_ENV: z.string().default("DEV"),
  POSTGRES_URL: z.string().startsWith("postgresql://").default(""),
});

export const env = envSchema.parse(process.env);
