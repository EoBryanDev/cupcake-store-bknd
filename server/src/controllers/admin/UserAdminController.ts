import { Request, Response } from "express";
import { loginAdminSchema } from "../../schemas/admin/post/login";
import { LoginAdminService } from "../../services/admin/LoginAdminService";

class UserAdminController {
  loginAdminService: LoginAdminService;

  constructor() {
    this.loginAdminService = new LoginAdminService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const credentials = loginAdminSchema.parse({ email, password });

    const data = await this.loginAdminService.login(credentials);

    const response = {
      data,
      error: "",
    };
    res.status(200).send(response);
  };
}

export { UserAdminController };
