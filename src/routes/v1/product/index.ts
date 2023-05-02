import { Router } from "express";
import { createProductRouter } from "./create";
import { deleteProductRouter } from "./delete";
import { getAllProductRouter } from "./get-all";
import { getOneProductRouter } from "./get-one";

const router = Router();

router.use(createProductRouter);
router.use(deleteProductRouter);
router.use(getAllProductRouter);
router.use(getOneProductRouter);

export { router as indexProductRouter };
