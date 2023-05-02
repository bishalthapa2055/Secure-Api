import { Router } from "express";
import { getOneProductHandler } from "../../../controllers/product/get-one";

const router = Router();

router.get("/:id", getOneProductHandler);

export { router as getOneProductRouter };
