import { Router } from "express";
import { UserAdminController } from "../../../../controllers/admin/UserAdminController";

const homeAdmin: Router = Router();
const homeAdminController = new UserAdminController();

homeAdmin.post("/admin/login", homeAdminController.login);

export { homeAdmin };
