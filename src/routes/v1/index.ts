import { Router } from "express";
import { indexUserRouter } from "./user";

const router = Router();

router.use("/user", indexUserRouter);

export { router as indexRouter };
