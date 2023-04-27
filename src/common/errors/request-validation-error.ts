import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export declare type JoiErrorType = {
  msg: any;
  param: any;
};
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[] | JoiErrorType[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: (err as any).param };
    });
  }
}
