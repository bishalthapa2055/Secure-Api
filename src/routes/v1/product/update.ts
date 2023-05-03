import { Router } from "express";
import { updataProductHandler } from "../../../controllers/product/update";

const router = Router();

router.patch("/:id", updataProductHandler);

export { router as updateProductRouter };
