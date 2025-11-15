import { AppError } from "../AppError";

class ConflictError extends AppError {
  constructor(message: string = "Resource Already Exists") {
    super(message, 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export { ConflictError };
