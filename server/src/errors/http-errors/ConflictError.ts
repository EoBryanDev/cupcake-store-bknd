import { AppError } from "../AppError";

class ConflictError extends AppError {
  constructor(message: string = "Recurso já existe") {
    super(message, 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export { ConflictError };
