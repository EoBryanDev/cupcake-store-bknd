import { z } from "zod";

const updateOrderSchema = z.object({
  orderId: z.string(),
  receiverName: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().nullable().optional(),
  referencePoint: z.string().nullable().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: z.string().nullable().optional(),
  shippingCompany: z.string().optional(),
  shippingTax: z.number().optional(),
  discount: z.number().optional(),
  totalPriceInCents: z.number().optional(),
  status: z.enum([
    "PENDING",
    "PAID",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
    "FAILED",
  ]),
  paymentType: z.enum(["BANK_SLIP", "CREDIT_CARD", "DEBIT_CARD"]).optional(),
  approval: z.enum(["APPROVED", "PENDING", "REJECTED"]).optional(),
});

type TUpdateOrder = z.infer<typeof updateOrderSchema>;

export { updateOrderSchema };
export type { TUpdateOrder };
