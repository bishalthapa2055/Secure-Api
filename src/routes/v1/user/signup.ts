import { Router } from "express";
import { signupUserHandler } from "../../../controllers/user/signup";
import { body } from "express-validator";
import { validateRequest } from "../../../common/middlewares/validate-request";

const router = Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name field is required"),
    // body("email").notEmpty().withMessage("Email field is required"),
    body("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password Field is required"),
  ],
  validateRequest,
  signupUserHandler
);

export { router as signUpUserRouter };
