import { NotFoundError } from "../errors/http-errors/NotFoundError";
import { parseSecondsToIsoString } from "../helpers/parseSecondsToISOString";
import { IDataInToken } from "../interfaces/IDataInToken";
import { IHashPassword } from "../interfaces/IHashPassword";
import { ITokenGenerator } from "../interfaces/ITokenGenerator";
import { LoginModel } from "../models/LoginModel";
import { TLogin } from "../schemas/post/login";
import { BCryptHashPwd } from "./BCryptHashPwd";
import { JwtTokenGenerator } from "./JwtTokenGenerator";

class LoginService {
  loginModel: LoginModel;
  hashService: IHashPassword;
  tokenService: ITokenGenerator;

  constructor() {
    this.loginModel = new LoginModel();
    this.hashService = new BCryptHashPwd();
    this.tokenService = new JwtTokenGenerator();
  }

  login = async (credentials: TLogin) => {
    const user = await this.loginModel.findUserByEmail(credentials.email);

    if (!user) {
      throw new NotFoundError("User e-mail not found!");
    }

    const userPasswordCompare = await this.hashService.compare(
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
      this.tokenService.generate(token_payload);

    const response = {
      access_token,
      expires_in: expiresIn,
      expires_at: parseSecondsToIsoString(expiresIn),
    };

    return response;
  };
}

export { LoginService };
