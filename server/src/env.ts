import { z } from "zod";

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
  SERVER_IP: z.string().default("http://localhost"),
  SERVER_ENV: z.string().default("DEV"),
  POSTGRES_URL: z.string().startsWith("postgresql://").default(""),
  POSTGRES_URL_DEV: z.string().startsWith("postgresql://").default(""),
  BETTER_AUTH_SECRET: z.string().default(""),
  CLIENT_DEV: z.string().default("http://localhost:5173"),
  CLIENT_PROD: z.string().default("http://localhost:5173"),
  JWT_SECRET: z.string().default(""),
  JWT_EXPIRES_INT: z.coerce.number().default(3600),
  JWT_SECRET_ADMIN: z.string().default(""),
  JWT_EXPIRES_INT_ADMIN: z.coerce.number().default(3600),
});

export const env = envSchema.parse(process.env);
