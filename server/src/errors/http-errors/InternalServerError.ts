import { AppError } from "../AppError";

class InternalServerError extends AppError {
  constructor(message: string = "Erro interno do servidor") {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export { InternalServerError };
