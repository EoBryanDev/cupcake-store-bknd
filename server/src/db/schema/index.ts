import { categories } from "./categories";
import { operateAreas } from "./operate-areas";
import { orderItems } from "./order-items";
import { orders } from "./orders";
import { productVariants } from "./product-variants";
import { products } from "./products";
import { shippingAddresses } from "./shipping-addresses";
import { stockFluxes } from "./stock-fluxes";
import { stocks } from "./stocks";
import { tests } from "./tests.db.schema";
import { users } from "./users";

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
};
