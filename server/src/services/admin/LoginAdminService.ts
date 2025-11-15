import { NotFoundError } from "../../errors/http-errors/NotFoundError";
import { parseSecondsToIsoString } from "../../helpers/parseSecondsToISOString";
import { IDataInToken } from "../../interfaces/IDataInToken";
import { IHashPassword } from "../../interfaces/IHashPassword";
import { ITokenGenerator } from "../../interfaces/ITokenGenerator";
import { LoginAdminModel } from "../../models/admin/LoginAdminModel";
import { TAdminLogin } from "../../schemas/admin/post/login";
import { BCryptHashPwd } from "../BCryptHashPwd";
import { JwtAdminTokenGenerator } from "./JwtAdminTokenGenerator";

class LoginAdminService {
  loginAdminModel: LoginAdminModel;
  hashAdminService: IHashPassword;
  tokenAdminService: ITokenGenerator;

  constructor() {
    this.loginAdminModel = new LoginAdminModel();
    this.hashAdminService = new BCryptHashPwd();
    this.tokenAdminService = new JwtAdminTokenGenerator();
  }

  login = async (credentials: TAdminLogin) => {
    const user = await this.loginAdminModel.findUserByEmail(credentials.email);

    if (!user) {
      throw new NotFoundError("User e-mail not found!");
    }

    const userPasswordCompare = await this.hashAdminService.compare(
      credentials.password,
      user.password,
    );

    if (!userPasswordCompare) {
      throw new NotFoundError("E-mail/Password is incorrect!");
    }

    const token_payload: IDataInToken = {
      role: user.role,
      user_id: user.userId,
    };

    const { access_token, expiresIn } =
      this.tokenAdminService.generate(token_payload);

    const response = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      access_token,
      expires_in: expiresIn,
      expires_at: parseSecondsToIsoString(expiresIn),
    };

    return response;
  };
}

export { LoginAdminService };
