import { AppError } from "../AppError";

class AuthError extends AppError {
  constructor(message: string = "User Unauthorized") {
    super(message, 403);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export { AuthError };
