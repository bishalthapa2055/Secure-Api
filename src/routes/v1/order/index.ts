import { Router } from "express";
import { createOrderRouter } from "./create";
import { getAllOrderRouter } from "./get-all";

const router = Router();

router.use(createOrderRouter);
router.use(getAllOrderRouter)

export { router as indexOrderRouter };
