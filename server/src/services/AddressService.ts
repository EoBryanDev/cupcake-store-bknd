import { NotFoundError } from "../errors/http-errors/NotFoundError";
import { AddressModel } from "../models/AddressModel";
import { TAddress } from "../schemas/post/address";
import { TUpdateAddress } from "../schemas/put/address";

class AddressService {
  addressModel: AddressModel;

  constructor() {
    this.addressModel = new AddressModel();
  }

  createAddress = async (payload: TAddress, user_id: string) => {
    const already_exist_user = await this.addressModel.findAddressByUserNStreet(
      payload.street,
      user_id,
    );

    if (already_exist_user) {
      throw new NotFoundError("User Address already exist");
    }

    const response = await this.addressModel.createAddress(payload, user_id);

    return response;
  };

  updateAddress = async (
    address_id: string,
    payload: TUpdateAddress,
    user_id: string,
  ) => {
    const addressExists = await this.addressModel.findAddressById(
      address_id,
      user_id,
    );

    if (!addressExists) {
      throw new NotFoundError("User address was not found");
    }

    const response = await this.addressModel.updateAddress(
      address_id,
      payload,
      user_id,
    );

    return response;
  };

  deleteAddress = async (shippingAddrId: string, user_id: string) => {
    const addressExists = await this.addressModel.findAddressById(
      shippingAddrId,
      user_id,
    );

    if (!addressExists) {
      throw new NotFoundError("User address was not found");
    }

    const response = await this.addressModel.deleteAddress(
      shippingAddrId,
      user_id,
    );
    return response;
  };

  findAddresses = async (user_id: string) => {
    const response = await this.addressModel.findAddresses(user_id);

    if (response.length === 0) {
      return null;
    }

    return response;
  };
}

export { AddressService };
