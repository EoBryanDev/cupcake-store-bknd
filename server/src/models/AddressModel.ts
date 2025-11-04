import { sql } from "drizzle-orm";
import { schema } from "../db/schema";
import { db } from "../lib/postgres-connection";
import { TAddress } from "../schemas/post/address";
import { TUpdateAddress } from "../schemas/put/address";

class AddressModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  createAddress = async (payload: TAddress, userId: string) => {
    const [created] = await this.dbPostGres
      .insert(schema.shippingAddresses)
      .values({ ...payload, userId: userId })
      .returning();

    return created;
  };

  updateAddress = async (payload: TUpdateAddress, userId: string) => {
    const [updated] = await this.dbPostGres
      .update(schema.shippingAddresses)
      .set({ ...payload, userId: userId })
      .returning();

    return updated;
  };

  findAddressByUserNStreet = async (street: string, userId: string) => {
    const address = await this.dbPostGres.query.shippingAddresses.findFirst({
      where: (address, { eq, and }) =>
        and(
          eq(sql`UPPER(TRIM(${address.street}))`, street.toUpperCase().trim()),
          eq(address.userId, userId),
        ),
    });
    return address;
  };

  findAddressById = async (shippingAddrId: string, userId: string) => {
    const address = await this.dbPostGres.query.shippingAddresses.findFirst({
      where: (address, { eq, and }) =>
        and(
          eq(address.shippingAddrId, shippingAddrId),
          eq(address.userId, userId),
        ),
    });
    return address;
  };

  findAddresses = async (userId: string) => {
    const address = await this.dbPostGres.query.shippingAddresses.findMany({
      where: (address, { eq }) => eq(address.userId, userId),
    });
    return address;
  };
}
export { AddressModel };
