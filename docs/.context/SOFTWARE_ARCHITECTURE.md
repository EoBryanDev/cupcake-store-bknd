# SOFTWARE ARCHITECTURE & DESIGN GUIDELINES

## 1. Architectural Vision & Philosophy

- **Philosophy:** Robust / Enterprise
- **Rationale:** The system is built for longevity and maintainability. We prioritize a modular structure to prevent the "Big Ball of Mud," allowing business contexts to be isolated while residing in a single deployment unit (Monolith).

## 2. Development Methodology

- **Domain Approach:** Anemic CRUD. Business logic resides primarily in Service layers, using simple data structures (DTOs/Interfaces) for data transfer.
- **Testing Strategy:** Strict TDD (Red-Green-Refactor). No production code shall be written without a failing test case first. Unit tests must mock external dependencies (database, external APIs).
- **Behavior Specs:** Functional requirements are validated through integration tests targeting the REST endpoints.

## 3. High-Level Pattern

- **Architecture:** Modular Monolith.
- **Layering:**
  - **Entry Points:** REST Controllers (Express/Fastify) responsible for parsing request data.
  - **Application/Service Layer:** Contains the "Transaction Script" logic and orchestrates calls to repositories.
  - **Infrastructure/Data Access:** Drizzle ORM schemas and Repositories.
  - **Cross-Cutting:** Winston Logger, Global Error Handler, and Zod Validation.

## 4. Design Principles (The Law)

- **SOLID Compliance:** Strict adherence.
  - **Dependency Inversion:** High-level modules must not depend on low-level modules. Both must depend on abstractions (Interfaces).
  - **Dependency Injection:** Mandatory use of DI (via constructor) to facilitate mocking during TDD.
- **Separation of Concerns:** Business logic must be separated from HTTP concerns and Database implementation details.

## 5. Coding Standards & Documentation

- **Comment Strategy:** Self-documenting Code. Names of variables, functions, and classes must be descriptive enough to eliminate the need for comments unless explaining a "Why" (not a "How").
- **Naming Conventions:**
  - `I` prefix for Interfaces (e.g., `IUserRepository`).
  - `T` prefix for Types (e.g., `TUserCreateInput`).
  - `camelCase` for logic; `snake_case` for database columns (Drizzle).

## 6. Cross-Cutting Concerns

- **Error Handling:**
  - **Internal Flow:** Result Pattern. Functions return an object/union indicating `Success` or `Failure` to avoid uncontrolled try/catch blocks in business logic.
  - **Global Rendering:** A Centralized Error Middleware filters all exceptions. It specifically handles `ZodError` for schema validation and maps internal Failures to standardized REST responses.
- **Logging:** Winston-based observability.
  - `Error` level for crashes/unhandled exceptions.
  - `Warn` for validation failures or Result Pattern "Failures".
  - `Info` for request traceability and critical business milestones.

## 7. Architect's Notes (Trade-offs)

> "We are adopting a Modular Monolith with an Anemic Domain. This choice acknowledges that the complexity lies in the data relationships and external integrations rather than complex state-machine behaviors. By enforcing TDD and Dependency Injection, we ensure that if a module needs to become a Microservice in the future, the boundaries are already clearly defined and tested."
