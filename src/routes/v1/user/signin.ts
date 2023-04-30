import { Router } from "express";
import { signupUserHandler } from "../../../controllers/user/signup";
import { body } from "express-validator";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { signInHandler } from "../../../controllers/user/signin";

const router = Router();

router.post("/signin", signInHandler);

export { router as signInUserRouter };
