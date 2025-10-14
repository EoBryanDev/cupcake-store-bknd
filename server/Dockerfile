# --- Estágio de Build ---
# Usa uma imagem Node.js mais completa para o build
FROM node:20-slim AS builder

# Define o diretório de trabalho para o estágio de build
WORKDIR /app

# Habilita o Corepack (o gerenciador do pnpm e yarn)
ENV COREPACK_ENABLE_PNPM=1

# Instala o pnpm globalmente usando npm (que já está disponível)
# Instalar o pnpm primeiro garante que o comando 'pnpm' esteja disponível
RUN npm install -g pnpm

# Copia apenas os arquivos de lockfile e package.json
COPY package.json pnpm-lock.yaml ./

# Agora o comando 'pnpm' deve estar disponível para instalação de dependências
RUN pnpm install --frozen-lockfile

# Copia o restante do código-fonte da aplicação
COPY . .

# Compila o projeto
RUN pnpm build

# --- Estágio de Produção ---
# Usa uma imagem Node.js baseada em Alpine para ser o menor possível
FROM node:20-alpine AS production

# Define o diretório de trabalho para o estágio de produção
WORKDIR /app

# Habilita o Corepack
ENV COREPACK_ENABLE_PNPM=1

# Instala o pnpm globalmente para o estágio de produção também
# Isso é necessário porque o pnpm não é copiado junto com o node_modules
RUN npm install -g pnpm

# Copia as dependências de produção do estágio de build.
COPY --from=builder /app/node_modules ./node_modules

# Copia os arquivos compilados (geralmente a pasta 'dist') do estágio de build.
COPY --from=builder /app/dist ./dist

# Copia o package.json para que os metadados estejam disponíveis
COPY --from=builder /app/package.json .

# Expõe a porta que sua aplicação utiliza
EXPOSE 3333

# Comando para iniciar a aplicação em produção.
CMD [ "node", "dist/server.js" ]