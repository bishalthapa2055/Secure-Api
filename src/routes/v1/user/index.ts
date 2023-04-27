import { Router } from "express";
import { signUpUserRouter } from "./signup";

const router = Router();

router.use(signUpUserRouter);
// app.use(signInUserRouter);

export { router as indexUserRouter };
