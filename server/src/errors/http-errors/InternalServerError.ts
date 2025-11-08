import { AppError } from "../AppError";

class InternalServerError extends AppError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export { InternalServerError };
