import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema";

const connectionString = "";
console.log(connectionString);

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function main() {
  console.log("Seeding database...");

  // Delete all data
  await db.delete(schema.orderItems);
  await db.delete(schema.orders);
  await db.delete(schema.shippingAddresses);
  await db.delete(schema.operateAreas);
  await db.delete(schema.stockFluxes);
  await db.delete(schema.stocks);
  await db.delete(schema.productVariants);
  await db.delete(schema.products);
  await db.delete(schema.categories);
  await db.delete(schema.users);

  // Users
  const users = await db
    .insert(schema.users)
    .values([
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: "password",
        role: "ADMIN",
      },
      ...Array.from({ length: 10 }, (_, i) => ({
        firstName: `Customer`,
        lastName: `${i + 1}`,
        email: `customer${i + 1}@example.com`,
        password: "password",
      })),
    ])
    .returning();

  // Categories
  const categories = await db
    .insert(schema.categories)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Category ${i + 1}`,
        slug: `category-${i + 1}`,
        description: `Description for category ${i + 1}`,
        createdBy: users[0].userId,
      })),
    )
    .returning();

  // Products
  const products = await db
    .insert(schema.products)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Product ${i + 1}`,
        slug: `product-${i + 1}`,
        description: `Description for product ${i + 1}`,
        categoryId: categories[i].categoryId,
        createdBy: users[0].userId,
      })),
    )
    .returning();

  // Product Variants
  const productVariants = await db
    .insert(schema.productVariants)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Product Variant ${i + 1}`,
        slug: `product-variant-${i + 1}`,
        description: `Description for product variant ${i + 1}`,
        priceInCents: (i + 1) * 1000,
        productId: products[i].productId,
        createdBy: users[0].userId,
      })),
    )
    .returning();

  // Stocks
  const stocks = await db
    .insert(schema.stocks)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Stock ${i + 1}`,
        description: `Description for stock ${i + 1}`,
        createdBy: users[0].userId,
      })),
    )
    .returning();

  // Stock Fluxes
  await db.insert(schema.stockFluxes).values(
    Array.from({ length: 10 }, (_, i) => ({
      stockId: stocks[i].stockId,
      productVariantId: productVariants[i].productVariantId,
      quantity: 100,
      createdBy: users[0].userId,
    })),
  );

  // Operate Areas
  await db.insert(schema.operateAreas).values(
    Array.from({ length: 10 }, (_, i) => ({
      city: `City ${i + 1}`,
      state: `State ${i + 1}`,
      country: "Country",
      shippingTax: (i + 1) * 100,
      createdBy: users[0].userId,
    })),
  );

  // Shipping Addresses
  await db.insert(schema.shippingAddresses).values(
    Array.from({ length: 10 }, (_, i) => ({
      userId: users[i + 1].userId,
      receiverName: `Customer ${i + 1}`,
      street: `Street ${i + 1}`,
      number: `${i + 1}`,
      neighborhood: `Neighborhood ${i + 1}`,
      city: `City ${i + 1}`,
      state: `State ${i + 1}`,
      country: "Country",
      zipCode: `12345-67${i}`,
    })),
  );

  // Orders
  const orders = await db
    .insert(schema.orders)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        userId: users[i + 1].userId,
        receiverName: `Customer ${i + 1}`,
        street: `Street ${i + 1}`,
        number: `${i + 1}`,
        neighborhood: `Neighborhood ${i + 1}`,
        city: `City ${i + 1}`,
        state: `State ${i + 1}`,
        country: "Country",
        zipCode: `12345-67${i}`,
        totalPriceInCents: (i + 1) * 1000,
      })),
    )
    .returning();

  // Order Items
  await db.insert(schema.orderItems).values(
    Array.from({ length: 10 }, (_, i) => ({
      orderId: orders[i].orderId,
      productVariantId: productVariants[i].productVariantId,
      name: `Product Variant ${i + 1}`,
      quantity: 1,
      priceInCents: (i + 1) * 1000,
    })),
  );

  console.log("Seeding complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
