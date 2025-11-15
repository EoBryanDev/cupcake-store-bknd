# Cupcake Store - Backend

Este é o backend para a aplicação Cupcake Store, responsável por gerenciar usuários, produtos, pedidos e mais.

---

## Sumário

- [Cupcake Store - Backend](#cupcake-store---backend)
  - [Sumário](#sumário)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Pré-requisitos](#pré-requisitos)
  - [Como Começar](#como-começar)
    - [1. Clone o Repositório](#1-clone-o-repositório)
    - [2. Instale as Dependências](#2-instale-as-dependências)
    - [3. Configure as Variáveis de Ambiente](#3-configure-as-variáveis-de-ambiente)
  - [Executando a Aplicação](#executando-a-aplicação)
    - [Modo de Desenvolvimento](#modo-de-desenvolvimento)
    - [Modo de Produção](#modo-de-produção)
  - [Utilizando Docker](#utilizando-docker)
  - [Scripts Disponíveis](#scripts-disponíveis)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Banco de Dados](#banco-de-dados)
  - [Documentação da API](#documentação-da-api)
- [English Version](#english-version)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [Using Docker](#using-docker)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [Database](#database)
  - [API Documentation](#api-documentation)

---

## Funcionalidades

- Autenticação de usuário (registro e login)
- Gerenciamento de produtos, categorias e variantes
- Gerenciamento de pedidos
- Painel de administração para gerenciamento de loja
- Endereços de entrega

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática
- **Drizzle ORM**: ORM TypeScript para bancos de dados SQL
- **PostgreSQL**: Banco de dados relacional
- **Zod**: Biblioteca de validação de esquema
- **Vitest**: Framework de testes
- **Docker**: Plataforma de containerização

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Como Começar

### 1. Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd cupcake-store-bknd/server
```

### 2. Instale as Dependências

```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na pasta `server` copiando o exemplo `.example.env`.

```bash
cp .example.env .env
```

Preencha o arquivo `.env` com as seguintes variáveis:

- `SERVER_PORT`: Porta para o servidor (ex: 3333)
- `SERVER_IP`: Endereço IP do servidor (ex: http://localhost)
- `SERVER_ENV`: Ambiente (`DEV` ou `PROD`)
- `POSTGRES_URL`: URL de conexão do banco de dados de produção
- `POSTGRES_URL_DEV`: URL de conexão do banco de dados de desenvolvimento
- `JWT_SECRET`: Segredo para tokens JWT de usuário
- `JWT_EXPIRES_INT`: Tempo de expiração para tokens JWT de usuário (em segundos)
- `JWT_SECRET_ADMIN`: Segredo para tokens JWT de administrador
- `JWT_EXPIRES_INT_ADMIN`: Tempo de expiração para tokens JWT de administrador

## Executando a Aplicação

### Modo de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com hot-reload:

```bash
pnpm dev
```

### Modo de Produção

Para construir e iniciar a aplicação em modo de produção:

```bash
pnpm build
pnpm start
```

## Utilizando Docker

O `docker-compose.yml` está configurado para iniciar o banco de dados PostgreSQL.

Para iniciar o container do banco de dados:

```bash
pnpm docker:up
```

Para parar o container:

```bash
pnpm docker:down
```

Para parar e remover os volumes (cuidado, isso apagará os dados do banco):

```bash
pnpm docker:down-brute
```

## Scripts Disponíveis

- `pnpm start`: Inicia o servidor em modo de produção.
- `pnpm dev`: Inicia o servidor em modo de desenvolvimento.
- `pnpm test`: Executa os testes.
- `pnpm build`: Compila o código TypeScript para JavaScript.
- `pnpm db:generate`: Gera migrações do Drizzle com base nas alterações do schema.
- `pnpm db:migrate`: Aplica as migrações pendentes ao banco de dados.
- `pnpm db:seed`: Popula o banco de dados com dados de teste.
- `pnpm lint`: Verifica o código em busca de erros de lint.
- `pnpm format`: Formata o código usando Prettier.

## Estrutura do Projeto

```
src/
├── controllers/ # Controladores (lógica de requisição/resposta)
├── db/          # Configuração do banco, schemas e migrações
├── errors/      # Classes de erro customizadas
├── helpers/     # Funções auxiliares
├── interfaces/  # Interfaces e tipos
├── lib/         # Configuração de bibliotecas (ex: conexão com Postgres)
├── middlewares/ # Middlewares do Express
├── models/      # Lógica de acesso a dados
├── routes/      # Definição de rotas da API
├── schemas/     # Schemas de validação (Zod)
├── services/    # Lógica de negócio
├── tests/       # Testes da aplicação
└── server.ts    # Ponto de entrada da aplicação
```

## Banco de Dados

Para gerar e aplicar migrações do banco de dados:

1.  Altere os schemas em `src/db/schema/`.
2.  Gere uma nova migração:
    ```bash
    pnpm db:generate
    ```
3.  Aplique a migração ao banco de dados:
    ```bash
    pnpm db:migrate
    ```

Para popular o banco com dados iniciais, execute:

```bash
pnpm db:seed
```

## Documentação da API

As rotas da API podem ser exploradas e testadas usando o arquivo `client.http`. Você pode usar a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VS Code para fazer requisições a partir deste arquivo.

---

# English Version

This is the backend for the Cupcake Store application, responsible for managing users, products, orders, and more.

---

## Table of Contents

- [Cupcake Store - Backend](#cupcake-store---backend)
  - [Summary](#summary)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [Using Docker](#using-docker)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [Database](#database)
  - [API Documentation](#api-documentation)

---

## Features

- User authentication (register and login)
- Management of products, categories, and variants
- Order management
- Admin panel for store management
- Shipping addresses

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **TypeScript**: Superset of JavaScript that adds static typing
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **PostgreSQL**: Relational database
- **Zod**: Schema validation library
- **Vitest**: Testing framework
- **Docker**: Containerization platform

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd cupcake-store-bknd/server
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `server` folder by copying the `.example.env` file.

```bash
cp .example.env .env
```

Fill the `.env` file with the following variables:

- `SERVER_PORT`: Port for the server (e.g., 3333)
- `SERVER_IP`: Server IP address (e.g., http://localhost)
- `SERVER_ENV`: Environment (`DEV` or `PROD`)
- `POSTGRES_URL`: Production database connection URL
- `POSTGRES_URL_DEV`: Development database connection URL
- `JWT_SECRET`: Secret for user JWTs
- `JWT_EXPIRES_INT`: Expiration time for user JWTs (in seconds)
- `JWT_SECRET_ADMIN`: Secret for admin JWTs
- `JWT_EXPIRES_INT_ADMIN`: Expiration time for admin JWTs (in seconds)

## Running the Application

### Development Mode

To start the server in development mode with hot-reloading:

```bash
pnpm dev
```

### Production Mode

To build and start the application in production mode:

```bash
pnpm build
pnpm start
```

## Using Docker

The `docker-compose.yml` is configured to start the PostgreSQL database.

To start the database container:

```bash
pnpm docker:up
```

To stop the container:

```bash
pnpm docker:down
```

To stop and remove volumes (warning, this will delete database data):

```bash
pnpm docker:down-brute
```

## Available Scripts

- `pnpm start`: Starts the server in production mode.
- `pnpm dev`: Starts the server in development mode.
- `pnpm test`: Runs the tests.
- `pnpm build`: Compiles the TypeScript code to JavaScript.
- `pnpm db:generate`: Generates Drizzle migrations based on schema changes.
- `pnpm db:migrate`: Applies pending migrations to the database.
- `pnpm db:seed`: Populates the database with test data.
- `pnpm lint`: Lints the code for errors.
- `pnpm format`: Formats the code using Prettier.

## Project Structure

```
src/
├── controllers/ # Controllers (request/response logic)
├── db/          # Database configuration, schemas, and migrations
├── errors/      # Custom error classes
├── helpers/     # Helper functions
├── interfaces/  # Interfaces and types
├── lib/         # Library configurations (e.g., Postgres connection)
├── middlewares/ # Express middlewares
├── models/      # Data access logic
├── routes/      # API route definitions
├── schemas/     # Validation schemas (Zod)
├── services/    # Business logic
├── tests/       # Application tests
└── server.ts    # Application entry point
```

## Database

To generate and apply database migrations:

1.  Modify the schemas in `src/db/schema/`.
2.  Generate a new migration:
    ```bash
    pnpm db:generate
    ```
3.  Apply the migration to the database:
    ```bash
    pnpm db:migrate
    ```

To populate the database with initial data, run:

```bash
pnpm db:seed
```

## API Documentation

The API routes can be explored and tested using the `client.http` file. You can use the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in VS Code to make requests from this file.
