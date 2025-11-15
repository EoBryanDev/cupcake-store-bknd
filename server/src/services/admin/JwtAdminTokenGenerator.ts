import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../env";
import { ITokenGenerator } from "../../interfaces/ITokenGenerator";

export class JwtAdminTokenGenerator implements ITokenGenerator {
  private readonly secret: string;

  constructor() {
    this.secret = env.JWT_SECRET_ADMIN;
  }

  generate(payload: object): { access_token: string; expiresIn: number } {
    const expiresIn = env.JWT_EXPIRES_INT_ADMIN;

    const options: SignOptions = { expiresIn: expiresIn };

    return {
      access_token: jwt.sign(payload, this.secret, options),
      expiresIn,
    };
  }

  validate(token: string): object | null {
    try {
      return jwt.verify(token, this.secret) as object;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
