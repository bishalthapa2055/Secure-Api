import { Router } from "express";
import { signUpUserRouter } from "./signup";
import { signInUserRouter } from "./signin";
import { getAllUsersRouter } from "./get-all";

const router = Router();

router.use(signUpUserRouter);
router.use(signInUserRouter);
router.use(getAllUsersRouter)

export { router as indexUserRouter };
