import { Router } from "express";
import { createOrderRouter } from "./create";
import { getAllOrderRouter } from "./get-all";
import { getOneOrderRouter } from "./get-one";

const router = Router();

router.use(createOrderRouter);
router.use(getAllOrderRouter);
router.use(getOneOrderRouter);

export { router as indexOrderRouter };
