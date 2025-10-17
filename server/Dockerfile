# --- Estágio de Build ---
FROM node:20-slim AS builder

WORKDIR /app

ENV COREPACK_ENABLE_PNPM=1
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# --- Estágio de Produção ---
FROM node:20-alpine AS production

WORKDIR /app

ENV COREPACK_ENABLE_PNPM=1
RUN npm install -g pnpm

# Instala o cliente postgres
RUN apk add --no-cache postgresql-client

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

# Copia o script de entrada
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/server.js"]