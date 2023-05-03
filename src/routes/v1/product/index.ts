import { Router } from "express";
import { createProductRouter } from "./create";
import { deleteProductRouter } from "./delete";
import { getAllProductRouter } from "./get-all";
import { getOneProductRouter } from "./get-one";
import { updateProductRouter } from "./update";

const router = Router();

router.use(createProductRouter);
router.use(deleteProductRouter);
router.use(getAllProductRouter);
router.use(getOneProductRouter);
router.use(updateProductRouter);

export { router as indexProductRouter };
