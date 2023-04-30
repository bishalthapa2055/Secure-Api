import { Router } from "express";
import { signUpUserRouter } from "./signup";
import { signInUserRouter } from "./signin";

const router = Router();

router.use(signUpUserRouter);
router.use(signInUserRouter);

export { router as indexUserRouter };
