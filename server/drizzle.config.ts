import { defineConfig } from "drizzle-kit";

import { env } from './src/env'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/db/schema/**.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.SERVER_ENV === 'DEV' ? env.POSTGRES_URL_DEV : env.POSTGRES_URL,
  },
});
