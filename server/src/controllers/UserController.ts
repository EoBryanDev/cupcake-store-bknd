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
      ...data,
      error: "",
    };
    res.status(200).send(response);
  };

  register = async (req: Request, res: Response) => {
    const { body } = req;

    const registerInfo = registerSchema.parse(body);

    const data = await this.loginService.login(registerInfo);

    const response = {
      ...data,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { UserController };
