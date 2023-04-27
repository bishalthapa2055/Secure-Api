import { CustomError } from "./custom-error";

export class JoiValidationError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, JoiValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
