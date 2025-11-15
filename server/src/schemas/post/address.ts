import { z } from "zod";

const addressSchema = z.object({
  receiverName: z.string().min(2, "Receiver name is invalid"),
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  complement: z.string().optional(),
  referencePoint: z.string().optional(),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(9, "Zip code is invalid"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  mainAddress: z.boolean(),
});

type TAddress = z.infer<typeof addressSchema>;

export { addressSchema };
export type { TAddress };
