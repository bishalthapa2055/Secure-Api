import { Request, Response } from "express";
import { User } from "../../model/user";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { check } from "express-validator";

const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z0-9]).+$/;

    if (email) {
      const isUser = await User.findOne({ email });
      if (isUser) {
        throw new BadRequestError("email already exists");
      }
    }
    if (password.length < 8) {
      throw new BadRequestError("Password Must Be greate than 8 characters");
    }
    if (!regex.test(password)) {
      throw new BadRequestError(
        "Password must contain at least 1 Uppercase , Lowercase , Number and Alpha Numeric characters"
      );
    }

    const createUser = await User.build({ name, email, password }).save();
    if (!createUser) throw new BadRequestError("Unable to create User");
    res.status(201).json({
      status: true,
      message: "Sucessfully Created User",
      data: createUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: [
        (error as any).message
          ? (error as any).message
          : "Failed to Create User . Debug Backend !!!",
      ],
    });
  }
};

export { signupUser as signupUserHandler };
