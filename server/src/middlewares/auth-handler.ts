import { Request, Response, NextFunction } from "express";
import { JwtTokenGenerator } from "../services/JwtTokenGenerator";
import { IDataInToken } from "../interfaces/IDataInToken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const jwtService = new JwtTokenGenerator();
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
