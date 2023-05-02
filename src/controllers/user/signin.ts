import { Request, Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Password } from "../../services/password";
import { User } from "../../model/user";
import jwt from "jsonwebtoken";

const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let user: any;
    if (!email) {
      throw new BadRequestError("Email is required");
    }
    if (!password) {
      throw new BadRequestError("Password is required");
    }

    user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Email Not found");
    }
    const passwordMatch = await Password.compare(user!.password, password);
    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    const userJwt = jwt.sign(
      {
        id: user!.id,
        email: user!.email,
      },
      "key",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ status: true, accessToken: userJwt, data: user });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: (error as any).message
        ? (error as any).message
        : "Failed to Login ",
    });
  }
};

export { signInUser as signInHandler };
