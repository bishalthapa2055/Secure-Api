import { Router } from "express";
import { indexUserRouter } from "./user";
import { indexProductRouter } from "./product";
import { indexOrderRouter } from "./order";
import { indexPaymentRouter } from "./payment";

const router = Router();

router.use("/user", indexUserRouter);
router.use("/product", indexProductRouter);
router.use("/order", indexOrderRouter);
router.use("/payment", indexPaymentRouter)

export { router as indexRouter };
