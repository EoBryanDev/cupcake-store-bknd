# SOFTWARE ENGINEERING SPECIFICATIONS

## 1. Stack Overview

- **Type:** Backend
- **Language:** Node.js 20 (LTS)
- **Package Manager:** pnpm

## 2. Backend Implementation Specs

- **Database Strategy:**
  - **Provider:** PostgreSQL (Local: Docker Compose / Production: Neon)
  - **Access Layer:** Drizzle ORM
  - **Multi-tenancy:** Row Level Security (RLS) strategy (Planned/Upcoming implementation)
- **Performance & Scalability:**
  - **Caching:** N/A (Direct database queries)
  - **Queues:** N/A (Synchronous processing for now)
  - **Pagination:** Offset-based (using `limit` and `offset`)
- **Security & Auth:**
  - **Access Control:** RBAC (Role-Based Access Control)
  - **Password Handling:** Hashing with Bcrypt and stateless authentication via JWT (JSON Web Tokens)

## 3. Frontend Implementation Specs

- **Core Framework:** N/A (API Only)
- **Styling Engine:** N/A
- **State Management:** N/A
- **Internationalization:** N/A

## 4. Developer Guidelines (Directives for Coding AI)

> **Backend & Database:**
>
> - "Always use Drizzle Kit for schema migrations and keeping the database in sync."
> - "All table schemas must include a `tenant_id` column (or similar) to facilitate the upcoming transition to Row Level Security (RLS)."
> - "Implement a centralized error handling middleware to capture and format responses consistently."
> - "Standardize API responses following a consistent JSON structure (e.g., error: `{ success: false, message: "Page not found", data: null, error: { code: PAGE_OUT_BOUNDS, details: "..."} }` | success: `{ success: true, message: null, data: ..., meta: { page, limit, totalItems, totalPages }, error: null`)."
>
> **Security & Auth:**
>
> - "Use a salt factor of 12 for Bcrypt password hashing."
> - "JWT tokens must have a defined expiration time (e.g., 1h) and use a secure environment variable for the secret key."
> - "Enforce RBAC checks at the service or controller layer before executing sensitive operations."
>
> **Node.js 20 Specifics:**
>
> - "Prefer native Node.js features (like the built-in test runner or fetch API) where applicable to minimize dependencies."
> - "Ensure the project uses ES Modules (`"type": "module"` in package.json)."
