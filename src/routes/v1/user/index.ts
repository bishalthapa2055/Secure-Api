import { Router } from "express";
import { signUpUserRouter } from "./signup";
import { signInUserRouter } from "./signin";
import { getAllUsersRouter } from "./get-all";
import { getOneUserRouter } from "./get-one";

const router = Router();

router.use(signUpUserRouter);
router.use(signInUserRouter);
router.use(getAllUsersRouter);
router.use(getOneUserRouter);

export { router as indexUserRouter };
