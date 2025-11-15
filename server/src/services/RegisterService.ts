import { NotFoundError } from "../errors/http-errors/NotFoundError";
import { IHashPassword } from "../interfaces/IHashPassword";
import { RegisterModel } from "../models/RegisterModel";
import { TRegister } from "../schemas/post/register";
import { BCryptHashPwd } from "./BCryptHashPwd";

class RegisterService {
  registerModel: RegisterModel;
  hashService: IHashPassword;

  constructor() {
    this.registerModel = new RegisterModel();
    this.hashService = new BCryptHashPwd();
  }

  register = async (payload: TRegister) => {
    const already_exist_user = await this.registerModel.findUserByEmail(
      payload.email,
    );

    if (already_exist_user) {
      throw new NotFoundError("User already exist");
    }
    const hashedPwd = await this.hashService.hash(payload.password);

    const response = await this.registerModel.register({
      ...payload,
      password: hashedPwd,
    });

    return response;
  };
}

export { RegisterService };
