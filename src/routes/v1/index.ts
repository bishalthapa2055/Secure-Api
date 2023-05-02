import { Router } from "express";
import { indexUserRouter } from "./user";
import { indexProductRouter } from "./product";

const router = Router();

router.use("/user", indexUserRouter);
router.use("/product", indexProductRouter);

export { router as indexRouter };
