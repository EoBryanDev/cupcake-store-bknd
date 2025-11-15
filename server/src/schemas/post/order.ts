import { z } from "zod";

const orderItemsSchema = z.array(
  z.object({
    productVariantId: z.string(),
    name: z.string(),
    priceInCents: z.number(),
    imageUrl: z.string(),
    quantity: z.number(),
  }),
);

const orderSchema = z.object({
  receiverName: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().nullable().optional(),
  referencePoint: z.string().nullable().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipCode: z.string(),
  phoneNumber: z.string().nullable().optional(),
  shippingCompany: z.string(),
  shippingTax: z.number(),
  discount: z.number(),
  totalPriceInCents: z.number(),
  status: z.enum([
    "PENDING",
    "PAID",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
    "FAILED",
  ]),
  paymentType: z.enum(["BANK_SLIP", "CREDIT_CARD", "DEBIT_CARD"]),
  items: orderItemsSchema,
});

type TOrder = z.infer<typeof orderSchema>;
type TOrderItems = z.infer<typeof orderItemsSchema>;

export { orderSchema };
export type { TOrder, TOrderItems };
