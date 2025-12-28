# LANGUAGE & SYNTAX CONTEXT

## 1. Language Definition

- **Language:** TypeScript
- **Version:** v5.9.2 (Targeting latest syntax features)
- **Runtime/Target:** Node.js v20+ (ESM Modules)
- **Database:** PostgreSQL (Interfaced via Drizzle ORM)

## 2. Compiler/Interpreter Configuration

- **Strictness Level:** Full Strict Mode Enabled (`strict: true`)
  - `noImplicitAny: true`
  - `strictNullChecks: true`
  - `noUnusedLocals: true`
- **Module System:** ES Modules (ESM) - Use `.js` extensions in imports if required by runtime or specific build flags.
- **Type Strategy:**
  - Use `interface` for object structures and class contracts.
  - Use `type` for attribute definitions, unions, intersections, and primitives.

## 3. Syntax & Style Conventions

- **Paradigm:** Hybrid.
  - **Functional:** Preferred for utility functions, helpers, and data transformations.
  - **OOP:** Required for complex business logic, domain services, and structural architectures.
- **Naming Conventions:**
  - **Variables/Functions:** `camelCase`.
  - **Interfaces:** `PascalCase` with **"I"** prefix (e.g., `IUserAccount`).
  - **Types:** `PascalCase` with **"T"** prefix (e.g., `TUserRole`).
  - **Classes:** `PascalCase`.
  - **Database (Drizzle/Postgres):** All table and column names must be `snake_case`.
- **Linting & Formatting:**
  - Follow **Airbnb Style Guide** (Strict semicolons, trailing commas, 2-space indentation).
  - Code must be compatible with ESLint and Prettier.

## 4. Language-Specific "Knowledge Base"

> **TypeScript & ESM Rules:**
>
> - Avoid `enum`. Prefer `const objects` or `Union Types` (prefixed with `T`).
> - Use `await` at top-level where supported (Node 20 ESM).
> - Explicitly define return types for public Class methods and exported functions to ensure API stability.
>   **Drizzle ORM & Postgres Rules:**
>
> - Define schemas using `pgTable` with explicitly named `snake_case` columns.
> - Use the `drizzle-kit` workflow for migrations.
> - Utilize `inferSelect` and `inferInsert` from `drizzle-orm` to map database types to TypeScript interfaces/types.
> - Prefer CTEs via Drizzle's query builder for complex joins.
>   **Node 20 (ESM) Specifics:**
>
> - Ensure `package.json` contains `"type": "module"`.
> - Use `node:` protocol for built-in imports (e.g., `import fs from 'node:fs'`).
