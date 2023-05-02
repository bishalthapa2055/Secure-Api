import { Router } from "express";
import { deleteProductHandler } from "../../../controllers/product/delete";

const router = Router();

router.delete("/:id", deleteProductHandler);

export { router as deleteProductRouter };
