import { Router } from "express";
import { indexUserRouter } from "./user";
import { indexProductRouter } from "./product";
import { indexOrderRouter } from "./order";

const router = Router();

router.use("/user", indexUserRouter);
router.use("/product", indexProductRouter);
router.use("/order", indexOrderRouter);

export { router as indexRouter };
