# System Requirements

## Functional Requirements

### Users

- List Products:

  - List products by category
  - List variant products

- Create an account
- Login in own account

- Create a new order
- Create an shipping address
- Check shipping tax through CEP
- List orders made

### Admin

- Login in own account

- Create an operating area:

  - Average delivery time
  - Shipping Tax
  - Country
  - State
  - City

- Create a new product
- Create a new product variant
- Increment product variant balance

- Edit operating area
- Edit a product
- Edit a product variant
- Change product variant availability

- Remove operating area
- Remove a product
- Remove a product variant
- Decrement product variant balance

- Admin can:

  - Deny an order
  - Approve an order
  - Update status order to:
    - Packing
    - Shipping
    - Delivering
    - Delivered

- List products
- List product variants
- List operating areas
- List users orders
- List sale balance

## Non-Functional Requirements

- Only create an account with password encrypted
- Throw an exception if system operator try create a user with email duplicated
- Throw an exception if admin try create a product with name duplicated
- Throw an exception if admin try create a product variant with name duplicated
- Before finish order it may verified product variants balance to check if it order can be done
- If idempotency key are duplicated it should throw an exception
- Query search must by paginated by default
- When no found items in query search must return 400 no data found
- DB must manage ID (auto generated uuid)
- Checking if order destination is on operation area:
  - If do not, do not let user finish the order
  - If do, let user finish order

## Design Requirements

- It must be used NodeJS
- It must be used Eslint, Prettier and .config as code formatters
- It must be develop an http server with Express framework
- It must be used pnpm as package manager
- It must be used Typescript
- It must be create an API Documentation with Swagger
- It must be used PostgreSQL as DB
- It must be used Drizzle as ORM
- It must be delivered DB with Docker
- It must be used MVC architecture (Controller-Service-Model)
- It must be used JWT as auth service
- It must be used BCrypt as hash service
- It must be used Zod to validate Http data
- It must be used Vitest to test
- It must be used Cors and Helmet
- It must be used Axios as http service handler
- It must be used to monitoration OpenTelemetry and Prom+Graf on Docker
- It must be created a pipeline CI with Github Action
