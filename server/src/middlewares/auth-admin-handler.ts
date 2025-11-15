import { Request, Response, NextFunction } from "express";
import { IDataInToken } from "../interfaces/IDataInToken";
import { JwtAdminTokenGenerator } from "../services/admin/JwtAdminTokenGenerator";

export function authAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const jwtService = new JwtAdminTokenGenerator();
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // Espera no formato "Bearer <token>"
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  const payload = jwtService.validate(token);

  if (!payload) {
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }

  // 🔹 Se quiser anexar o usuário ao request
  req.user = payload as IDataInToken;

  next();
}
