import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema";

// 1. Configuração da Conexão com o Banco de Dados
const connectionString = process.env.POSTGRES_URL;
console.log(`[INFO] Conectando ao banco de dados...`);

if (!connectionString) {
  throw new Error(
    "POSTGRES_URL não está definida. Certifique-se de que a variável de ambiente está configurada.",
  );
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

/**
 * Função principal para popular o banco de dados com dados de exemplo.
 */
async function seedDatabase() {
  console.log("[INFO] Iniciando o processo de seeding do banco de dados...");

  // 2. Limpeza de Dados Existentes (em ordem reversa de dependência)
  // É importante deletar os dados em uma ordem que respeite as chaves estrangeiras.
  console.log("[INFO] Limpando dados existentes...");
  await db.delete(schema.orderItems);
  await db.delete(schema.orders);
  await db.delete(schema.shippingAddresses);
  await db.delete(schema.stockFluxes);
  await db.delete(schema.stocks);
  await db.delete(schema.productVariants);
  await db.delete(schema.products);
  await db.delete(schema.categories);
  await db.delete(schema.users);
  console.log("[INFO] Dados existentes limpos.");

  // 3. Inserção de Usuários
  console.log("[INFO] Inserindo usuários...");
  const users = await db
    .insert(schema.users)
    .values([
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: "password", // Em um ambiente real, use hashing seguro.
        role: "ADMIN",
      },
      // Cria 10 usuários clientes genéricos
      ...Array.from({ length: 10 }, (_, i) => ({
        firstName: `Cliente`,
        lastName: `${i + 1}`,
        email: `cliente${i + 1}@example.com`,
        password: "password", // Em um ambiente real, use hashing seguro.
      })),
    ])
    .returning({ userId: schema.users.userId }); // Retorna apenas o ID do usuário inserido
  console.log(`[SUCCESS] ${users.length} usuários inseridos.`);

  // 4. Inserção de Categorias
  console.log("[INFO] Inserindo categorias...");
  const categories = await db
    .insert(schema.categories)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Categoria ${i + 1}`,
        slug: `categoria-${i + 1}`,
        description: `Descrição para a categoria ${i + 1}`,
        createdBy: users[0].userId, // O primeiro usuário é o admin
      })),
    )
    .returning({ categoryId: schema.categories.categoryId }); // Retorna apenas o ID da categoria
  console.log(`[SUCCESS] ${categories.length} categorias inseridas.`);

  // 5. Inserção de Produtos
  console.log("[INFO] Inserindo produtos...");
  const products = await db
    .insert(schema.products)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Produto ${i + 1}`,
        slug: `produto-${i + 1}`,
        description: `Descrição para o produto ${i + 1}`,
        categoryId: categories[i].categoryId, // Associa cada produto a uma categoria
        createdBy: users[0].userId,
      })),
    )
    .returning({ productId: schema.products.productId }); // Retorna apenas o ID do produto
  console.log(`[SUCCESS] ${products.length} produtos inseridos.`);

  // 6. Inserção de Variações de Produto
  console.log("[INFO] Inserindo variações de produto...");
  const productVariants = await db
    .insert(schema.productVariants)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Variação do Produto ${i + 1}`,
        slug: `variacao-produto-${i + 1}`,
        description: `Descrição para a variação do produto ${i + 1}`,
        priceInCents: (i + 1) * 1000, // Preço em centavos
        productId: products[i].productId, // Associa cada variação a um produto
        createdBy: users[0].userId,
      })),
    )
    .returning({ productVariantId: schema.productVariants.productVariantId }); // Retorna apenas o ID da variação
  console.log(
    `[SUCCESS] ${productVariants.length} variações de produto inseridas.`,
  );

  // 7. Inserção de Estoques
  console.log("[INFO] Inserindo estoques...");
  const stocks = await db
    .insert(schema.stocks)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Estoque ${i + 1}`,
        description: `Descrição para o estoque ${i + 1}`,
        createdBy: users[0].userId,
      })),
    )
    .returning({ stockId: schema.stocks.stockId }); // Retorna apenas o ID do estoque
  console.log(`[SUCCESS] ${stocks.length} estoques inseridos.`);

  // 8. Inserção de Fluxos de Estoque
  console.log("[INFO] Inserindo fluxos de estoque...");
  await db.insert(schema.stockFluxes).values(
    Array.from({ length: 10 }, (_, i) => ({
      stockId: stocks[i].stockId,
      productVariantId: productVariants[i].productVariantId,
      quantity: 100, // Quantidade de exemplo
      createdBy: users[0].userId,
    })),
  );
  console.log(`[SUCCESS] 10 fluxos de estoque inseridos.`);

  // 9. Inserção de Áreas de Operação
  console.log("[INFO] Inserindo áreas de operação...");
  await db.insert(schema.operateAreas).values(
    Array.from({ length: 10 }, (_, i) => ({
      city: `Cidade ${i + 1}`,
      state: `Estado ${i + 1}`,
      country: "Brasil",
      shippingTax: (i + 1) * 100, // Taxa de frete em centavos
      createdBy: users[0].userId,
    })),
  );
  console.log(`[SUCCESS] 10 áreas de operação inseridas.`);

  // 10. Inserção de Endereços de Entrega
  console.log("[INFO] Inserindo endereços de entrega...");
  // Associa endereços aos usuários clientes (a partir do segundo usuário)
  await db.insert(schema.shippingAddresses).values(
    Array.from({ length: 10 }, (_, i) => ({
      userId: users[i + 1].userId, // Associa a clientes diferentes
      receiverName: `Cliente ${i + 1}`,
      street: `Rua ${i + 1}`,
      number: `${i + 1}`,
      neighborhood: `Bairro ${i + 1}`,
      city: `Cidade ${i + 1}`,
      state: `Estado ${i + 1}`,
      country: "Brasil",
      zipCode: `12345-67${i}`,
    })),
  );
  console.log(`[SUCCESS] 10 endereços de entrega inseridos.`);

  // 11. Inserção de Pedidos
  console.log("[INFO] Inserindo pedidos...");
  const orders = await db
    .insert(schema.orders)
    .values(
      Array.from({ length: 10 }, (_, i) => ({
        userId: users[i + 1].userId, // Associa pedidos a clientes diferentes
        receiverName: `Cliente ${i + 1}`,
        street: `Rua ${i + 1}`,
        number: `${i + 1}`,
        neighborhood: `Bairro ${i + 1}`,
        city: `Cidade ${i + 1}`,
        state: `Estado ${i + 1}`,
        country: "Brasil",
        zipCode: `12345-67${i}`,
        totalPriceInCents: (i + 1) * 1000, // Preço total do pedido em centavos
      })),
    )
    .returning({ orderId: schema.orders.orderId }); // Retorna apenas o ID do pedido
  console.log(`[SUCCESS] ${orders.length} pedidos inseridos.`);

  // 12. Inserção de Itens de Pedido
  console.log("[INFO] Inserindo itens de pedido...");
  await db.insert(schema.orderItems).values(
    Array.from({ length: 10 }, (_, i) => ({
      orderId: orders[i].orderId, // Associa cada item a um pedido
      productVariantId: productVariants[i].productVariantId, // Associa a uma variação de produto
      name: `Variação do Produto ${i + 1}`, // Nome pode ser duplicado para manter consistência
      quantity: 1, // Quantidade de exemplo
      priceInCents: (i + 1) * 1000, // Preço unitário do item em centavos
    })),
  );
  console.log(`[SUCCESS] 10 itens de pedido inseridos.`);

  console.log("[SUCCESS] Seeding do banco de dados concluído com sucesso!");
  process.exit(0); // Sai do processo com código 0 (sucesso)
}

// Execução da função principal e tratamento de erros
seedDatabase().catch((err) => {
  console.error("[ERROR] Ocorreu um erro durante o seeding:", err);
  process.exit(1); // Sai do processo com código 1 (erro)
});
