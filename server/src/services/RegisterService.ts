import { NotFoundError } from "../errors/http-errors/NotFoundError";
import { RegisterModel } from "../models/RegisterModel";
import { TRegister } from "../schemas/post/register";

class RegisterService {
  registerModel: RegisterModel;

  constructor() {
    this.registerModel = new RegisterModel();
  }

  register = async (payload: TRegister) => {
    const already_exist_user = await this.registerModel.findUserByEmail(
      payload.email,
    );

    if (already_exist_user) {
      throw new NotFoundError("User already exist");
    }

    const response = await this.registerModel.register(payload);

    return response;
  };
}

export { RegisterService };
