import { Request, Response } from "express";
import { loginSchema } from "../schemas/post/login";
import { LoginService } from "../services/LoginService";
import { RegisterService } from "../services/RegisterService";
import { registerSchema } from "../schemas/post/register";

class UserController {
  loginService: LoginService;
  registerService: RegisterService;

  constructor() {
    this.loginService = new LoginService();
    this.registerService = new RegisterService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const credentials = loginSchema.parse({ email, password });

    const data = await this.loginService.login(credentials);

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };

  register = async (req: Request, res: Response) => {
    const { body } = req;

    const registerInfo = registerSchema.parse(body);

    const userCreated = await this.registerService.register(registerInfo);

    const loginResponse = await this.loginService.login({
      email: userCreated.email,
      password: registerInfo.password,
    });

    const createdUser = {
      email: userCreated.email,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      phoneNumber: userCreated.phoneNumber,
      legalId: userCreated.legalId,
      birthDate: userCreated.birthDate,
      createdAt: userCreated.createdAt,
      token: loginResponse.access_token,
      expires_in: loginResponse.expires_in,
      expires_at: loginResponse.expires_at,
    };

    const response = {
      data: createdUser,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { UserController };
