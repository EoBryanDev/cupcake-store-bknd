import { categories, categoriesRelations } from "./categories";
import { operateAreas } from "./operate-areas";
import { orderItems, orderItemsRelations } from "./order-items";
import { orders, ordersRelations } from "./orders";
import { productVariants, productVariantsRelations } from "./product-variants";
import { products, productsRelations } from "./products";
import { shippingAddresses } from "./shipping-addresses";
import { stockFluxes } from "./stock-fluxes";
import { stocks } from "./stocks";
import { tests } from "./tests.db.schema";
import { users, usersRelations } from "./users";

export const schema = {
  tests,
  users,
  categories,
  orders,
  orderItems,
  products,
  productVariants,
  stocks,
  stockFluxes,
  shippingAddresses,
  operateAreas,
  categoriesRelations,
  productsRelations,
  productVariantsRelations,
  usersRelations,
  orderItemsRelations,
  ordersRelations,
};
