import { Router } from "express";
import { createOrderRouter } from "./create";
import { getAllOrderRouter } from "./get-all";
import { getOneOrderRouter } from "./get-one";
import { deleteOrderRouter } from "./delete";

const router = Router();

router.use(createOrderRouter);
router.use(getAllOrderRouter);
router.use(getOneOrderRouter);
router.use(deleteOrderRouter)

export { router as indexOrderRouter };
